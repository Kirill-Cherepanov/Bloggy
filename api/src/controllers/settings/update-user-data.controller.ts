import { RequestHandler } from 'express';

import { updateUser } from 'use-cases/users';
import { setAccessToken, setRefreshToken } from 'web/tokens';

export const updateUserDataController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    const user = await updateUser(
      req.body,
      req.user.data.id,
      req.body?.oldPassword,
      req.body?.blog?.shouldDelete
    );
    if ('error' in user) return res.status(user.status).json(user.error);

    setRefreshToken(res, { ...user, id: user._id });
    setAccessToken(res, { ...user, id: user._id });

    res.status(200).json({ user, status: 'success' });
  } catch (err) {
    next(err);
  }
};
