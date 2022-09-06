import User from '../models/User';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { validateRegistration } from '../utility/validations';
import { handleEmailVerification } from '../utility/emailVerification';
import { generateAccessToken, verifyToken } from '../utility/jsonTokens';

const authRouter = express.Router();

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
      confirmationMessage,
    }: TUser & { confirmationMessage: string } = req.body;

    const emailVerified = await handleEmailVerification(
      email,
      confirmationMessage
    );
    if (!emailVerified.res) res.status(200).json(emailVerified.message);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData: TUser = {
      password: hashedPassword,
      email,
      username,
      blog: blog && {
        categories: blog.categories,
        description: blog.description,
      },
    };
    const user = await new User(userData).save();
    const { password: p_, ...publicData } = user._doc;

    const refreshToken = jwt.sign(
      {
        email,
        username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );
    const accessToken = generateAccessToken(user.username, user.email);

    res.status(200).json({ ...publicData, refreshToken, accessToken });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// TESTED
authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) return res.status(400).json('Wrong credentials!');

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json('Wrong credentials!');

    const { password, ...publicData } = user._doc;

    const accessToken = generateAccessToken(user.username, user.password);
    const refreshToken = jwt.sign(
      {
        email: publicData.email,
        username: publicData.username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.status(200).json({ ...publicData, refreshToken, accessToken });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

authRouter.post('/token', async (req, res) => {
  try {
    const refreshToken: string | null | undefined = req.body.token;
    if (!refreshToken) return res.status(401).json('No refresh token');

    const { err, decoded: userData } = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    if (err) return res.status(401).json('Incorrect refresh token');

    if (typeof userData === 'string' || userData === undefined) {
      console.error('The user is incorrect. User: ' + userData);
      return res.status(500).json('Oops... Something went very wrong!');
    }

    const user = await User.findOne({ userData });
    if (!user) return res.status(401).json('Incorrect refresh token');

    const accessToken = generateAccessToken(user.username, user.password);
    res.json({ accessToken });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default authRouter;
