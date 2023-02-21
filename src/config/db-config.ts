import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { RefreshTokenTrackerModel } from '../refresh-token-tracker/refresh-token-tracker.model';
import { UserModel } from '../user/user.model';

export const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<SequelizeModuleOptions> => {
    return {
      dialect: process.env.DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      logging: false,
      models: [UserModel, RefreshTokenTrackerModel],
    };
  },
};
