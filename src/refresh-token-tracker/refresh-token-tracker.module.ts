import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshTokenTrackerModel } from './refresh-token-tracker.model';
import { RefreshTokenTrackerRepository } from './refresh-token-tracker.repository';
import { RefreshTokenTrackerService } from './refresh-token-tracker.service';

@Module({
  imports: [SequelizeModule.forFeature([RefreshTokenTrackerModel])],
  providers: [RefreshTokenTrackerService, RefreshTokenTrackerRepository],
  exports: [RefreshTokenTrackerService],
})
export class TokenTrackerModule {}
