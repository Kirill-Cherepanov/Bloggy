import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import express from 'express';

import User from '../models/User';
import { verifyAccessToken, generateAccessToken } from '../utility/jsonTokens';
import { validateJsonBlob } from '../utility/validations';
import { upload } from '../utility/middleware';
import Post from '../models/Post';
import { getCategories } from '../utility/validations';

const settingsRouter = express.Router();

const updloadFields = upload.fields([
  {
    name: 'profile-picture',
    maxCount: 1,
  },
  {
    name: 'request-json',
    maxCount: 1,
  },
]);

// update user
settingsRouter.patch('', updloadFields, async (req, res) => {
  try {
    const verificationRes = await verifyAccessToken(req.body.accessToken);
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const jsonBuffer = await validateJsonBlob(req.files);
    if (!jsonBuffer) throw Error('Incorrect request');
    const sentData: Partial<TUser> = JSON.parse(jsonBuffer.buffer.toString());

    const user = await User.findOne({ username: verificationRes.username });
    if (user === null) {
      return res
        .status(500)
        .json(`User ${verificationRes.username} was not found!`);
    }

    const updatedUserData: Partial<TUser> & {
      oldPassword?: string;
      blog?: { shouldDelete?: boolean };
    } = getUserData(sentData);

    if (updatedUserData.password || updatedUserData.email) {
      if (!updatedUserData.oldPassword) {
        return res.status(500).json('Old password was not sent');
      }

      const validated = await bcrypt.compare(
        updatedUserData.oldPassword,
        user.password
      );

      if (!validated) {
        return res.status(500).json('Incorrect previous password!');
      }

      delete updatedUserData.oldPassword;
    }

    if ('profile-picture' in req.files!) {
      if (user.profilePic) {
        fs.unlink(user.profilePic, (err) => {
          if (err) console.error(err);
        });
      }

      const file = req.files!['profile-picture' as keyof typeof req.files][0];

      const filename =
        path.parse(file.originalname).name +
        `.${Date.now()}` +
        path.extname(file.originalname);

      updatedUserData.profilePic = filename;

      const filePath = './images/profilePics/' + filename;

      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) throw err;
      });
    }

    Object.assign(user, updatedUserData);
    await user.save();

    const { password, ...protectedData } = user._doc;

    const accessToken = generateAccessToken(user.username, user.email);
    const refreshToken = jwt.sign(
      {
        email: protectedData.email,
        username: protectedData.username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie('refresh-token', refreshToken, { httpOnly: true });
    res.status(200).json({ protectedData, accessToken });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// delete user
settingsRouter.delete('', async (req, res) => {
  try {
    const verificationRes = await verifyAccessToken(req.body.accessToken);
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const user = await User.findOne({ username: verificationRes.username });
    if (user === null) {
      return res
        .status(500)
        .json(`User ${verificationRes.username} was not found!`);
    }

    if (!req.body.oldPassword) {
      return res.status(500).json('Old password was not sent');
    }

    const validated = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validated) {
      return res.status(500).json('Incorrect previous password!');
    }

    if (user.profilePic) {
      fs.unlink(user.profilePic, (err) => {
        if (err) console.error(err);
      });
    }

    await Post.deleteMany({ username: user.username });
    await User.findOneAndDelete({ username: user.username });
    res.status(200).json('User has been deleted');
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default settingsRouter;

function getUserData(userData: any) {
  const newUserData: any = JSON.parse(JSON.stringify(userData));

  delete newUserData.profilePic;
  delete newUserData.blog?.likes;

  if (newUserData.blog?.categories) {
    newUserData.blog.categories = getCategories(newUserData.blog.categories);
  }
  if (newUserData.blog?.shouldDelete) {
    newUserData.blog = undefined;
  }

  return newUserData;
}
