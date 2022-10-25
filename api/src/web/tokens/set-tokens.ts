import { Response } from 'express';

import { AccessTokenData } from 'types/custom';
import { generateAccessToken, generateRefreshToken } from 'web/tokens';

export const setRefreshToken = (res: Response, data: AccessTokenData) => {
  const refreshToken = generateRefreshToken(data);

  res.cookie('refresh-token', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
};

export const setAccessToken = (res: Response, data: AccessTokenData) => {
  const accessToken = generateAccessToken(data);

  res.cookie('access-token', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
};
