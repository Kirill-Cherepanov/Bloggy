import User from '../models/User';
import Post from '../models/Post';
import bcrypt from 'bcrypt';
import express from 'express';
const usersRouter = express.Router();

// update
usersRouter.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const user = await User.findById(req.params.id);
      if (user === null) {
        return res
          .status(500)
          .json(`User by id ${req.params.id} was not found!`);
      }
      user.overwrite(req.body as TUser);
      await user.save();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You can update only your account!');
  }
});

// delete
usersRouter.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user === null) {
        return res
          .status(500)
          .json(`User by id ${req.params.id} was not found!`);
      }

      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json('User was not found!');
    }
  } else {
    res.status(401).json('You can delete only your account!');
  }
});

// get user
usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(500).json(`User by id ${req.params.id} was not found!`);
    }

    const { password, ...userInfo } = user;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default usersRouter;
