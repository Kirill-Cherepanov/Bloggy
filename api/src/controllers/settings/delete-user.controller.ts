import { RequestHandler } from 'express';
import { deleteUser } from 'use-cases/users';

export const deleteUserController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    if (!req.body['old-password']) {
      return res.status(400).json('Old password was not sent');
    }

    const result = await deleteUser(req.user.data.id, req.body['old-password']);
    if (result.err) return res.status(result.status).json(result.err);

    res.clearCookie('access-token');
    res.clearCookie('refresh-token');

    res.status(200).json('User has been deleted');
  } catch (err) {
    next(err);
  }
};
