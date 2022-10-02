import express from 'express';

import User from '../models/User';
import { SearchBlogs, searchBlogPosts } from '../utility/SearchDb';

const usersRouter = express.Router();

// get user TESTED
usersRouter.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      return res.status(500).json(`User ${req.params.username} was not found!`);
    }

    const { password, email, __v, _id, updatedAt, ...publicInfo } = user._doc;

    let posts: TBlog[] = [];
    if (publicInfo.blog) {
      posts = await searchBlogPosts(
        req.params.username,
        Number(req.query.page) || 1
      );
    }

    res.status(200).json({ user: publicInfo, posts });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// search blogs TESTED
usersRouter.get('/', async (req, res) => {
  try {
    const searchBlogs = new SearchBlogs(req.query);
    const blogs = await searchBlogs.getBlogs();
    res.status(200).json(blogs);
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default usersRouter;
