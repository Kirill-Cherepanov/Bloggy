import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from 'config';
import { AccessTokenData } from 'types/custom';

// Right now it doesn't make much sense to have two separate tokens. It's for the future
export const generateAccessToken = ({
  id,
  username,
  email,
}: AccessTokenData) => {
  return jwt.sign({ id, username, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

export const generateRefreshToken = ({
  id,
  username,
  email,
}: AccessTokenData) => {
  return jwt.sign({ id, username, email }, REFRESH_TOKEN_SECRET);
};
