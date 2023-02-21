import { Module } from '@nestjs/common';
import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthenticationModule } from './authentication/authentication.module';
import { TokenTrackerModule } from './refresh-token-tracker/refresh-token-tracker.module';
import { ConfigModule } from '@nestjs/config';
import { sequelizeAsyncConfig } from './config/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync(sequelizeAsyncConfig),
    UserModule,
    AuthenticationModule,
    TokenTrackerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
