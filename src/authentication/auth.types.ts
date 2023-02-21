import { CookieOptions } from 'express';

export interface CookiePayload {
  accessTokenName: string;
  accessTokenValue: string;
  refreshTokenName: string;
  refreshTokenValue: string;
  options: CookieOptions;
}
