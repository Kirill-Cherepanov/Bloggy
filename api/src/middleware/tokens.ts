import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { UserTokenData, AccessTokenData } from 'types/custom/tokens.types';

const ACCESS_TOKEN_EXPIRATION_TIME = '10m';

const verifyToken = async (
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

const generateAccessToken = ({ id, username, email }: AccessTokenData) => {
  return jwt.sign({ id, username, email }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

const verifyAccessToken = async (accessToken: string | undefined) => {
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
    console.error('The user is incorrect! User: ' + user);
    return {
      err: true,
      status: 500,
      message: 'Oops... Something went very wrong!',
    };
  }

  return user as AccessTokenData;
};

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
