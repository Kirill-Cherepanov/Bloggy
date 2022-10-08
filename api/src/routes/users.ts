import express from 'express';

import User from '../models/User';
import { searchBlogPosts } from '../utility/SearchDb';
import { verifyAccessToken } from '../utility/jsonTokens';

const usersRouter = express.Router();

// get user TESTED
usersRouter.get('/:username', async (req, res) => {
  try {
    let isLoggedIn = false;
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );
    if (!verificationRes.err) isLoggedIn = true;

    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      return res.status(500).json(`User ${req.params.username} was not found!`);
    }

    const { password, email, __v, _id, updatedAt, ...publicInfo } = user._doc;

    let posts: ClientTPost[] = [];
    if (publicInfo.blog) {
      posts = (
        await searchBlogPosts(req.params.username, Number(req.query.page) || 1)
      ).map((post) => ({
        ...post._doc,
        likes: post.likes.length,
        isLiked: isLoggedIn && post.likes.includes(verificationRes.id),
      }));
    }

    res.status(200).json({ user: publicInfo, posts });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default usersRouter;
