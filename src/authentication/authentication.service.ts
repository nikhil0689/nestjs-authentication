import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, ValidateUserProps } from '../user/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtService } from './auth-jwt.service';
import { CookieOptions } from 'express';
import { CookiePayload } from './auth.types';
import { hash } from '../utils';
import { RefreshTokenTrackerService } from '../refresh-token-tracker/refresh-token-tracker.service';
import appConfig from 'src/config/app-config';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private authJwtService: AuthJwtService,
    private refreshTokenTrackerService: RefreshTokenTrackerService,
  ) {}
  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user.password) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const passwordsMatch = await bcrypt.compare(password, user.props.password);
    if (!passwordsMatch) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async validateAndGetUserById(
    validateUserProps: ValidateUserProps,
  ): Promise<User> {
    const { userId, refreshToken } = validateUserProps;
    const user = await this.userService.getUserById(userId);
    if (refreshToken) {
      const refreshTokenTracker =
        await this.refreshTokenTrackerService.getRefreshTokenByUserId(userId);

      const refreshTokensMatch = await bcrypt.compare(
        refreshToken,
        refreshTokenTracker.refreshTokenHash,
      );

      if (!refreshTokensMatch) {
        throw new HttpException(
          'Invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    return user;
  }

  async authenticate(user: User): Promise<CookiePayload> {
    const accessToken = await this.authJwtService.generateAccessToken(user);
    const refreshToken = await this.authJwtService.generateRefreshToken(user);

    await this.updateRefreshTokenByUserId(user.id, refreshToken);

    const cookieOptions: CookieOptions = {
      httpOnly: appConfig().httpOnly as unknown as boolean,
      sameSite: appConfig().sameSite as unknown as boolean,
      domain: appConfig().domain,
      secure: appConfig().secure as unknown as boolean,
    };
    return {
      accessTokenName: appConfig().accessTokenName,
      accessTokenValue: accessToken,
      refreshTokenName: appConfig().refreshTokenName,
      refreshTokenValue: refreshToken,
      options: cookieOptions,
    };
  }

  async logOut(user: User): Promise<void> {
    await this.refreshTokenTrackerService.deleteRefreshTokenByUserId(user.id);
  }

  async updateRefreshTokenByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await hash(refreshToken);
    await this.refreshTokenTrackerService.saveIssuedRefreshToken(
      hashedRefreshToken,
      userId,
    );
  }
}
