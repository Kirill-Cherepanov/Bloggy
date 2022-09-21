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
      'confirm-email': confirmationMessage,
    }: TUser & { 'confirm-email': string | undefined | null } = req.body;

    const emailVerified = await handleEmailVerification(
      email,
      confirmationMessage
    );
    if (!emailVerified.res) return res.status(200).json({ messageSent: true });

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
    const { password: p_, ...protectedData } = user._doc;

    const refreshToken = jwt.sign(
      {
        email,
        username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );
    const accessToken = generateAccessToken(user.username, user.email);

    res.cookie('refresh-token', refreshToken, { httpOnly: true });
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ ...protectedData, success: true });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// login TESTED
authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) return res.status(400).json('Wrong credentials!');

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json('Wrong credentials!');

    const { password, ...publicData } = user._doc;

    const accessToken = generateAccessToken(user.username, user.email);
    const refreshToken = jwt.sign(
      {
        email: publicData.email,
        username: publicData.username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ ...publicData, isLoggedIn: true });
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
    if (!refreshToken) return res.status(200).json({ isLoggedIn: false });

    const { err, decoded: userData } = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    if (err) return res.status(200).json({ isLoggedIn: false });

    if (typeof userData === 'string' || userData === undefined) {
      console.error('The user is incorrect. User: ' + userData);
      return res.status(500).json('Oops... Something went very wrong!');
    }

    const user = await User.findOne({ userData });
    if (!user) return res.status(200).json({ isLoggedIn: false });

    const { password, __v, ...userInfo } = user._doc;

    const accessToken = generateAccessToken(user.username, user.email);
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ ...userInfo, isLoggedIn: true });
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
    if (!user) return res.status(500).json('User not found');

    const { password, __v, ...userInfo } = user._doc;

    res.status(200).json(userInfo);
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
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const { newPassword, confirmationMessage } = req.body;

    const passwordError = validatePassword(newPassword);
    if (passwordError) throw passwordError;

    const user = await User.findOne(verificationRes);
    if (user === null) return res.status(500).json(`User was not found`);

    const emailVerified = await handleEmailVerification(
      user.email,
      confirmationMessage
    );
    if (!emailVerified.res) return res.status(200).json(emailVerified.message);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();

    const { password, __v, ...userInfo } = user._doc;

    res.status(200).json(userInfo);
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default authRouter;
