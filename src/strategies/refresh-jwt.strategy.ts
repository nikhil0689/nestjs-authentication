import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthenticationService } from '../authentication/authentication.service';
import appConfig from '../config/app-config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(readonly authService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const userId = payload.sub as string;
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const user = await this.authService.validateAndGetUserById({
      userId,
      refreshToken,
    });
    return user;
  }
}
