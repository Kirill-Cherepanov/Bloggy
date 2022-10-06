import User from '../models/User';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

import { validateRegistration, validatePassword } from '../utility/validations';
import { handleEmailVerification } from '../utility/emailVerification';
import {
  generateAccessToken,
  verifyToken,
  verifyAccessToken,
} from '../utility/jsonTokens';

const authRouter = express.Router();

// register
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
    }: TUser & { confirmationMessage: string | undefined | null } = req.body;

    const emailVerified = await handleEmailVerification(
      email,
      confirmationMessage
    );
    if (emailVerified.status >= 400) {
      return res.status(emailVerified.status).json(emailVerified.message);
    }
    if (emailVerified.message === 'message sent') {
      return res.status(200).json({ status: 'message sent' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData: Omit<Partial<TUser>, 'blog'> & {
      blog?: Partial<TUser['blog']>;
    } = {
      password: hashedPassword,
      email,
      username,
      blog: blog && {
        categories: blog.categories,
        description: blog.description,
      },
    };
    const user = await new User(userData).save();

    const { password: p_, __v, _id, updatedAt, ...protectedData } = user._doc;

    const refreshToken = jwt.sign(
      {
        email,
        username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );
    const accessToken = generateAccessToken(
      user._id.toString(),
      user.username,
      user.email
    );

    res.cookie('refresh-token', refreshToken, { httpOnly: true });
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ user: protectedData, status: 'success' });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// login
authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) return res.status(400).json('Wrong credentials!');

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json('Wrong credentials!');

    const { password, __v, _id, updatedAt, ...protectedData } = user._doc;

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.username,
      user.email
    );
    const refreshToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true });

    res.status(200).json({ user: protectedData });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// get access token
authRouter.get('/token', async (req, res) => {
  try {
    const refreshToken: string | undefined = req.cookies['refresh-token'];
    if (!refreshToken) {
      return res
        .status(200)
        .json({ message: 'No refresh token', isLoggedIn: false });
    }

    const verificationRes = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    if ('err' in verificationRes) {
      return res.status(200).json({
        message: 'Refresh token verification error',
        isLoggedIn: false,
      });
    }

    const userData = verificationRes.decoded;

    if (typeof userData === 'string' || userData === undefined) {
      console.error('The user is incorrect. User: ' + userData);
      return res.status(500).json('Oops... Something went very wrong!');
    }

    const user = await User.findOne({ ...userData });
    if (!user) {
      return res
        .status(200)
        .json({ message: 'User does not exist', isLoggedIn: false });
    }

    const { password, __v, _id, updatedAt, ...protectedData } = user._doc;

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.username,
      user.email
    );
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ user: protectedData, isLoggedIn: true });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// get self
authRouter.get('/self', async (req, res) => {
  try {
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const user = await User.findOne(verificationRes);
    if (!user) return res.status(401).json('User not found');

    const { password, __v, _id, updatedAt, ...protectedData } = user._doc;

    res.status(200).json({ user: protectedData });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// logout
authRouter.delete('/logout', (req, res) => {
  res.clearCookie('refresh-token');
  res.status(200).json({ success: true });
});

// reset password
authRouter.post('/reset-password', async (req, res) => {
  try {
    const { newPassword, confirmationMessage, email } = req.body;

    if (typeof email !== 'string' || !email) {
      return res.status(400).json('Incorrect email value');
    }

    const user = await User.findOne({ email });
    if (user === null) return res.status(500).json(`User was not found`);

    const emailVerified = await handleEmailVerification(
      user.email,
      confirmationMessage
    );
    if (emailVerified.status >= 400) {
      return res.status(emailVerified.status).json(emailVerified.message);
    }
    if (emailVerified.message === 'message sent') {
      return res.status(200).json({ status: 'message sent' });
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) return res.status(400).json('Incorrect password!');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();

    const { password, __v, _id, updatedAt, ...protectedData } = user._doc;

    res.status(200).json({ user: protectedData, status: 'success' });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default authRouter;
