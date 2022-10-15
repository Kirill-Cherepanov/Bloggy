import { RequestHandler } from 'express';

import { validateUser } from 'use-cases/users';
import { generateAccessToken, generateRefreshToken } from 'web/tokens';

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    if (req.user.isLoggedIn) {
      return res.status(400).json('User is already logged in');
    }

    const user = await validateUser(
      { email: req.body.email, username: req.body.username },
      req.body.password
    );
    if (!user) return res.status(400).json('Wrong credentials');

    const refreshToken = generateRefreshToken({ ...user, id: user._id });
    const accessToken = generateAccessToken({ ...user, id: user._id });
    res.cookie('refresh-token', refreshToken, { httpOnly: true });
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
