import { RequestHandler } from 'express';

import { updateUser } from 'use-cases/users';
import { saveProfilePic } from 'web/file-manipulation';

export const updateProfilePicController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    if (!req.file) return res.status(400).json('No profile picture');
    const profilePic = saveProfilePic({ 'profile-picture': [req.file] })!;

    const user = await updateUser({ profilePic }, req.user.data.id);
    if ('err' in user) return res.status(user.status).json(user.err);

    res.status(200).json({ user, status: 'success' });
  } catch (err) {
    next(err);
  }
};
