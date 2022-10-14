import { RequestHandler } from 'express';

import { findUser } from 'use-cases/users';

export const getSelfController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    const user = findUser(req.user.data);
    if (!user) return res.status(401).json('User not found');

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
