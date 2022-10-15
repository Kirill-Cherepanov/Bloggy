import { RequestHandler } from 'express';

export const logoutController: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie('refresh-token');
    res.clearCookie('access-token');
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
