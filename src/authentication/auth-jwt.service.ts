import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import appConfig from '../config/app-config';
import { User } from '../user/user.entity';

@Injectable()
export class AuthJwtService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(user: User): Promise<string> {
    const jwtPayload = {
      sub: user.id,
    };
    const jwtSignOptions: JwtSignOptions = {
      algorithm: appConfig().jwtAlgorithm as Algorithm,
      expiresIn: appConfig().accessTokenExpiresIn,
      secret: appConfig().accessSecret,
    };
    const jwtString = await this.jwtService.signAsync(
      jwtPayload,
      jwtSignOptions,
    );
    return jwtString;
  }

  async generateRefreshToken(user: User): Promise<string> {
    const jwtPayload = {
      sub: user.id,
    };
    const jwtSignOptions: JwtSignOptions = {
      algorithm: appConfig().jwtAlgorithm as Algorithm,
      expiresIn: appConfig().refreshTokenExpiresIn,
      secret: appConfig().refreshSecret,
    };
    const jwtString = await this.jwtService.signAsync(
      jwtPayload,
      jwtSignOptions,
    );
    return jwtString;
  }
}
