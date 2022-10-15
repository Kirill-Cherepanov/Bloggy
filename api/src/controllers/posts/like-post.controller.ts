import { RequestHandler } from 'express';

import { likePost } from 'use-cases/posts';

export const likePostController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    const result = await likePost(req.params.id, req.user.data.id);

    if (result.err) return res.status(result.status).json(result.err);

    return result;
  } catch (err) {
    next(err);
  }
};
