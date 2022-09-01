import User from '../models/User';
import bcrypt from 'bcrypt';
import express from 'express';
const authRouter = express.Router();
import { validateRegistration } from '../utility/validations';

// TESTED
authRouter.post('/registration', async (req, res) => {
  try {
    const validationResult = await validateRegistration(req.body);
    if (!validationResult.res) {
      return res.status(500).json({ errors: validationResult.errors });
    }

    const {
      password,
      email,
      username,
      blog,
    }: TUser & { shouldCreateBlog: boolean } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData: TUser = {
      password: hashedPassword,
      email,
      username,
      blog: blog && {
        categories: blog.categories,
        description: blog.description,
      },
    };

    const newUser = new User(newUserData);

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// TESTED
authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) return res.status(400).json('Wrong credentials!');

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json('Wrong credentials!');

    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
    // Should send jwt token or something
  } catch (err) {
    res.status(500).json(err);
  }
});

export default authRouter;
