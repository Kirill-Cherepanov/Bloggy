import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { AccessTokenData } from 'types/custom/tokens.types';

export const verifyToken = async (
  token: string,
  key: string
): Promise<
  { decoded: string | JwtPayload | undefined } | { err: VerifyErrors }
> => {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, key, (err, decoded) =>
      err ? resolve({ err }) : resolve({ decoded })
    );
  });
};

export const verifyAccessToken = async (accessToken: string | undefined) => {
  if (!accessToken) {
    return { err: true, status: 401, message: 'No access token' };
  }

  const verificationRes = await verifyToken(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!
  );

  if ('err' in verificationRes) {
    return {
      err: true,
      status: 401,
      message: `Incorrect access token: ${verificationRes.err.message}`,
    };
  }

  const user = verificationRes.decoded;

  if (typeof user === 'string' || user === undefined) {
    throw Error('The user is incorrect! User: ' + user);
  }

  return user as AccessTokenData;
};

type RefreshTokenData = {
  id: string;
  username: string;
  email: string;
};

export const verifyRefreshToken = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    return { err: 'No refresh token' };
  }

  const verificationRes = await verifyToken(
    refreshToken,
    process.env.ACCESS_TOKEN_SECRET!
  );

  if ('err' in verificationRes) {
    return { err: `Incorrect refresh token: ${verificationRes.err.message}` };
  }

  const user = verificationRes.decoded;

  if (typeof user === 'string' || user === undefined) {
    throw Error('The user is incorrect! User: ' + user);
  }

  return user as RefreshTokenData;
};
