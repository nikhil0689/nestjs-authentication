import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RefreshTokenTracker } from './refresh-token-tracker.entity';
import * as bcrypt from 'bcrypt';
import { RefreshTokenTrackerRepository } from './refresh-token-tracker.repository';

@Injectable()
export class RefreshTokenTrackerService {
  constructor(
    private readonly refreshTokenTrackerRepository: RefreshTokenTrackerRepository,
  ) {}
  async saveIssuedRefreshToken(tokenId: string, userId: string): Promise<void> {
    const refreshTokenTracker = RefreshTokenTracker.create({
      refreshTokenHash: tokenId,
      userId,
    });
    await this.refreshTokenTrackerRepository.createRefreshTokenEntry(
      refreshTokenTracker,
    );
  }

  async getRefreshTokenByUserId(userId: string): Promise<RefreshTokenTracker> {
    const refreshToken =
      await this.refreshTokenTrackerRepository.getTokenByUserId(userId);
    if (!refreshToken) {
      throw new HttpException(
        'Refresh token details not available for the user',
        HttpStatus.NOT_FOUND,
      );
    }
    return refreshToken;
  }

  async deleteRefreshTokenByUserId(userId: string): Promise<void> {
    await this.refreshTokenTrackerRepository.deleteTokenByUserId(userId);
  }
}
