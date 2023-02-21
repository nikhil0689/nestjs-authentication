import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RefreshTokenGuard } from '../guards/refresh_token.guard';
import { RequestUser } from '../decorators/request-user.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { User } from '../user/user.entity';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('authenticate')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@RequestUser() user: User, @Res() response: Response) {
    await this.authenticate(user, response);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(@RequestUser() user: User, @Res() response: Response) {
    await this.authenticate(user, response);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@RequestUser() user: User) {
    await this.authenticationService.logOut(user);
  }

  private async authenticate(
    user: User,
    response: Response<any, Record<string, any>>,
  ) {
    const cookiePayload = await this.authenticationService.authenticate(user);
    const { accessTokenValue, refreshTokenName, refreshTokenValue, options } =
      cookiePayload;
    response.cookie(refreshTokenName, refreshTokenValue, options);
    response.json({ accessToken: accessTokenValue });
  }
}
