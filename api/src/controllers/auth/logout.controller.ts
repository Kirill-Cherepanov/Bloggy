import { RequestHandler } from 'express';

export const logoutController: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie('refresh-token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('access-token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
