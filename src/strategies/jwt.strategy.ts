import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import appConfig from '../config/app-config';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly authService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().accessSecret,
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;
    const user = await this.authService.validateAndGetUserById({ userId });
    return user;
  }
}
