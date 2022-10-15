import { RequestHandler } from 'express';

import { updateUser } from 'use-cases/users';
import { deleteProfilePic, saveProfilePic } from 'web/file-manipulation';
import { generateRefreshToken, generateAccessToken } from 'web/tokens';

export const updateUserController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    const profilePic = saveProfilePic(req.files);

    const user = await updateUser(
      req.body,
      req.user.data.id,
      req.body?.oldPassword,
      req.body?.blog?.shouldDelete
    );
    if ('err' in user) {
      if (profilePic) deleteProfilePic(profilePic);
      return res.status(user.status).json(user.err);
    }

    const refreshToken = generateRefreshToken({ ...user, id: user._id });
    const accessToken = generateAccessToken({ ...user, id: user._id });
    res.cookie('refresh-token', refreshToken, { httpOnly: true });
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ user, status: 'success' });
  } catch (err) {
    next(err);
  }
};