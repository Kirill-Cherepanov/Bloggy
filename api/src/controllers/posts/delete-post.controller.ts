import { RequestHandler } from 'express';

import { deletePost } from 'use-cases/posts';

export const deletePostController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    const result = await deletePost(req.params.id, req.user.data.username);

    if (result.err) return res.status(result.status).json(result.err);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
