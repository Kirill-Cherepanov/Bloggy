import jwt from 'jsonwebtoken';
import { AccessTokenData } from 'types/custom/tokens.types';

const ACCESS_TOKEN_EXPIRATION_TIME = '10m';

// Right now it doesn't make much sense to have two separate tokens. It's for the future
export const generateAccessToken = ({
  id,
  username,
  email,
}: AccessTokenData) => {
  return jwt.sign({ id, username, email }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

export const generateRefreshToken = ({
  id,
  username,
  email,
}: AccessTokenData) => {
  return jwt.sign({ id, username, email }, process.env.REFRESH_TOKEN_SECRET!);
};
