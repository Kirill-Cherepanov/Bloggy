import { RequestHandler } from 'express';

import { UserTokenData } from 'types/custom';
import { verifyAccessToken } from 'web/tokens';

export const handleTokens: RequestHandler = async (req, res, next) => {
  let user: UserTokenData;

  const verificationRes = await verifyAccessToken(req.cookies['access-token']);

  if ('err' in verificationRes) {
    user = {
      isLoggedIn: false,
      err: {
        message: verificationRes.message,
        statusCode: verificationRes.status,
      },
    };
  } else {
    user = {
      isLoggedIn: true,
      data: {
        id: verificationRes.id,
        username: verificationRes.username,
        email: verificationRes.email,
      },
    };
  }

  Object.assign(req, { user });

  next();
};
