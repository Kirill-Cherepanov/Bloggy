import { RequestHandler } from 'express';

import { findPost, searchPosts } from 'use-cases/posts';
import { findUser } from 'use-cases/users';

export const getPostController: RequestHandler = async (req, res, next) => {
  try {
    const post = await findPost(req.params.id);
    if (!post) return res.status(500).json('Post was not found');

    const author = await findUser({ username: post.authorName });
    if (!author) throw Error('Author of the post was not found');

    const otherPosts = (
      await searchPosts({ author: author.username })
    ).values.slice(0, 4);

    res.status(200).json({ post, author, otherPosts });
  } catch (err) {
    next(err);
  }
};
