import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleAsyncOptions, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from 'src/strategies/refresh-jwt.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { TokenTrackerModule } from '../refresh-token-tracker/refresh-token-tracker.module';
import { UserModule } from '../user/user.module';
import { AuthJwtService } from './auth-jwt.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TokenTrackerModule,
    JwtModule.register({}),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    AuthJwtService,
    RefreshTokenStrategy,
  ],
})
export class AuthenticationModule {}
