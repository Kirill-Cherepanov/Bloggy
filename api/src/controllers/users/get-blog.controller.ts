import { RequestHandler } from 'express';

import { searchPosts } from 'use-cases/posts';
import { findUser } from 'use-cases/users';

export const getBlogController: RequestHandler = async (req, res, next) => {
  try {
    const user = await findUser({ username: req.params.username });
    if (!user?.blog) return res.status(500).json('Blog was not found!');

    const { email, ...publicData } = user;

    const userId = req.user.isLoggedIn ? req.user.data.id : undefined;
    const posts = (
      await searchPosts(
        { author: req.params.username },
        { userId, getAll: true }
      )
    ).values;

    res.status(200).json({ user: publicData, posts });
  } catch (err) {
    next(err);
  }
};
