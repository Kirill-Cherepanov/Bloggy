import User from '../models/User';
import Post from '../models/Post';
import bcrypt from 'bcrypt';
import express from 'express';
const usersRouter = express.Router();

// Add restore password

// update
usersRouter.put('/:username', async (req, res) => {
  // ADD AUTHORIZATION !!!
  const user = await User.findOne({ username: req.params.username });
  if (user === null) {
    return res.status(500).json(`User ${req.query.username} was not found!`);
  }

  const {
    username,
    password,
    email,
    oldPassword,
  }: Partial<User> & { oldPassword: string } = req.body;

  if (password || email) {
    if (!oldPassword) {
      return res.status(500).json('Old password was not sent');
    }
    const validated = await bcrypt.compare(oldPassword, user.password);
    if (!validated) return res.status(400).json('Incorrect previous password!');
  }

  try {
    user.overwrite({ username, password, email } as User);
    await user.save();

    res.status(200).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
usersRouter.delete('/:username', async (req, res) => {
  // ADD AUTHORIZATION !!!
  // Add confirmation via email
  const user = await User.findOne({ username: req.params.username });
  if (user === null) {
    return res.status(500).json(`User ${req.params.username} was not found!`);
  }

  try {
    await Post.deleteMany({ username: user.username });
    await User.findOneAndDelete({ username: user.username });
    res.status(200).json('User has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// get
usersRouter.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user === null) {
      return res.status(500).json(`User ${req.params.username} was not found!`);
    }

    const { password, __v, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default usersRouter;
