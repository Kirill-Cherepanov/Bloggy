import User from '../models/User';
import Post from '../models/Post';
import bcrypt from 'bcrypt';
import express from 'express';
const usersRouter = express.Router();
import { SearchBlogs, searchBlogPosts } from '../utility/SearchDb';

// Add restore password

// update
usersRouter.put('/:username', async (req, res) => {
  // ADD AUTHORIZATION !!!

  try {
    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      return res.status(500).json(`User ${req.query.username} was not found!`);
    }

    let {
      username,
      password,
      email,
      oldPassword,
      blog,
    }: Partial<TUser> & { oldPassword?: string; changeBlog?: string } =
      req.body;

    if (password || email) {
      if (!oldPassword) {
        return res.status(500).json('Old password was not sent');
      }

      const validated = await bcrypt.compare(oldPassword, user.password);
      if (!validated) {
        return res.status(500).json('Incorrect previous password!');
      }
    }

    if (username) user.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    if (email) user.email = email;
    if (blog?.categories) {
      user.blog = {
        categories: blog.categories,
      };
    }
    if (blog?.description) {
      user.blog = {
        description: blog.description,
      };
    }

    await user.save();

    res.status(200).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete TESTED
usersRouter.delete('/:username', async (req, res) => {
  // ADD AUTHORIZATION !!!
  // Add confirmation via email
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      return res.status(500).json(`User ${req.params.username} was not found!`);
    }

    if (!req.body.oldPassword) {
      return res.status(500).json('Old password was not sent');
    }

    const validated = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validated) {
      return res.status(500).json('Incorrect previous password!');
    }

    await Post.deleteMany({ username: user.username });
    await User.findOneAndDelete({ username: user.username });
    res.status(200).json('User has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user TESTED
usersRouter.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      return res.status(500).json(`User ${req.params.username} was not found!`);
    }

    const { password, __v, ...userInfo } = user._doc;
    const posts = await searchBlogPosts(
      req.params.username,
      Number(req.query.page) || 1
    );

    res.status(200).json({ ...userInfo, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// search blogs TESTED
usersRouter.get('/', async (req, res) => {
  try {
    const searchBlogs = new SearchBlogs(req.query);
    const blogs = await searchBlogs.getBlogs();
    res.status(200).json(blogs);
  } catch (err: any) {
    res.status(500).json(err.toString());
  }
});

export default usersRouter;
