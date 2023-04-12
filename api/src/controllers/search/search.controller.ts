import { RequestHandler } from 'express';

import { searchPosts } from 'use-cases/posts';
import { searchBlogs } from 'use-cases/users';

export const searchController: RequestHandler = async (req, res) => {
  const userId = req.user.isLoggedIn ? req.user.data.id : undefined;

  if (req.query.type === 'posts' || !req.query.type) {
    const searchResult = await searchPosts(req.query, { userId });
    return res.status(200).json({ ...searchResult, type: 'posts' });
  }
  if (req.query.type === 'blogs') {
    const searchResult = await searchBlogs(req.query);
    return res.status(200).json({ ...searchResult, type: 'blogs' });
  }

  res.status(400).json(`Type ${req.query.type} doesn't exist`);
};
