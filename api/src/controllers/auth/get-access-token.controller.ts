import { RequestHandler } from 'express';
import { findUser } from 'use-cases/users';
import { verifyRefreshToken, generateAccessToken } from 'web/tokens';

export const getAccessTokenController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const refreshToken: unknown = req.cookies['refresh-token'];
    if (!refreshToken || typeof refreshToken !== 'string') {
      return res
        .status(200)
        .json({ message: 'No refresh token', isLoggedIn: false });
    }

    const verificationRes = await verifyRefreshToken(refreshToken);

    if ('err' in verificationRes) {
      return res.status(200).json({
        message: verificationRes.err,
        isLoggedIn: false,
      });
    }

    const user = await findUser(verificationRes);
    if (!user) {
      return res
        .status(200)
        .json({ message: 'User does not exist', isLoggedIn: false });
    }

    const accessToken = generateAccessToken({ ...user, id: user._id });
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ user, isLoggedIn: true });
  } catch (err) {
    next(err);
  }
};
