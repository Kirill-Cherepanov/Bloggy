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

// update profile picture
settingsRouter.put(
  '/profile-picture',
  upload.single('profile-picture'),
  async (req, res) => {
    try {
      const accessToken: string | undefined = req.cookies['access-token'];
      const verificationRes = await verifyAccessToken(accessToken);
      if (verificationRes.err) {
        return res.status(verificationRes.status).json(verificationRes.message);
      }

      if (!req.file) return res.status(400).json('No profile picture');

      const user = await User.findOne({ username: verificationRes.username });
      if (user === null) {
        return res
          .status(500)
          .json(`User ${verificationRes.username} was not found!`);
      }

      if (user.profilePic) {
        fs.unlink(user.profilePic, (err) => {
          if (err) console.error(err);
        });
      }

      const newProfilePic = req.file;

      const filename =
        path.parse(newProfilePic.originalname).name +
        `.${Date.now()}` +
        path.extname(newProfilePic.originalname);

      user.profilePic = filename;

      const filePath = './images/profilePics/' + filename;

      fs.writeFile(filePath, newProfilePic.buffer, (err) => {
        if (err) throw err;
      });
      user.save();

      res.status(200).json({ profilePic: newProfilePic });
    } catch (err: any) {
      console.error(err);
      if (err && typeof err === 'object' && 'message' in err) {
        res.status(500).json(err.message);
      }
    }
  }
);

// update everything but profile picture
settingsRouter.patch('/data', async (req, res) => {
  try {
    const accessToken: string | undefined = req.cookies['access-token'];
    const verificationRes = await verifyAccessToken(accessToken);
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const user = await User.findOne({ username: verificationRes.username });
    if (user === null) {
      return res
        .status(500)
        .json(`User ${verificationRes.username} was not found!`);
    }

    const updatedUserData: Partial<TUser> & {
      'old-password'?: string;
      blog?: { shouldDelete?: boolean };
    } = getUserData(req.body);

    if (
      updatedUserData.password ||
      updatedUserData.email ||
      updatedUserData.username
    ) {
      if (!updatedUserData['old-password']) {
        return res.status(500).json('Old password was not sent');
      }

      const validated = await bcrypt.compare(
        updatedUserData['old-password'],
        user.password
      );

      if (!validated) {
        return res.status(500).json('Incorrect previous password!');
      }

      delete updatedUserData['old-password'];
    }

    if (updatedUserData.blog?.shouldDelete) {
      delete user.blog;
      delete updatedUserData.blog;
    }

    Object.assign(user, updatedUserData);
    await user.save();

    const { password, __v, _id, updatedAt, ...protectedData } = user._doc;

    const newAccessToken = generateAccessToken(
      _id.toString(),
      user.username,
      user.email
    );
    const newRefreshToken = jwt.sign(
      {
        email: protectedData.email,
        username: protectedData.username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie('access-token', newAccessToken, { httpOnly: true });
    res.cookie('refresh-token', newRefreshToken, { httpOnly: true });

    res.status(200).json({ ...protectedData });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// update everything
settingsRouter.patch('', updloadFields, async (req, res) => {
  try {
    const accessToken: string | undefined = req.cookies['access-token'];
    const verificationRes = await verifyAccessToken(accessToken);
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const jsonBuffer = await validateJsonBlob(req.files);
    if (!jsonBuffer) return res.status(400).json('Incorrect request');
    const sentData: Partial<TUser> = JSON.parse(jsonBuffer.buffer.toString());

    const user = await User.findOne({ username: verificationRes.username });
    if (user === null) {
      return res
        .status(500)
        .json(`User ${verificationRes.username} was not found!`);
    }

    const updatedUserData: Partial<TUser> & {
      'old-password'?: string;
      blog?: { shouldDelete?: boolean };
    } = getUserData(sentData);

    if (
      updatedUserData.password ||
      updatedUserData.email ||
      updatedUserData.username
    ) {
      if (!updatedUserData['old-password']) {
        return res.status(500).json('Old password was not sent');
      }

      const validated = await bcrypt.compare(
        updatedUserData['old-password'],
        user.password
      );

      if (!validated) {
        return res.status(500).json('Incorrect previous password!');
      }

      delete updatedUserData['old-password'];
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
        if (!err) return;
        console.error(err);
        throw Error('Server error');
      });
    }

    Object.assign(user, updatedUserData);
    await user.save();

    const { password, __v, _id, updatedAt, ...protectedData } = user._doc;

    const newAccessToken = generateAccessToken(
      _id.toString(),
      user.username,
      user.email
    );
    const newRefreshToken = jwt.sign(
      {
        email: protectedData.email,
        username: protectedData.username,
      },
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie('access-token', newAccessToken, { httpOnly: true });
    res.cookie('refresh-token', newRefreshToken, { httpOnly: true });

    res.status(200).json({ ...protectedData });
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

    if (!req.body['old-password']) {
      return res.status(500).json('Old password was not sent');
    }

    const validated = await bcrypt.compare(
      req.body['old-password'],
      user.password
    );
    if (!validated) {
      return res.status(500).json('Incorrect previous password!');
    }

    if (user.profilePic) {
      fs.unlink(user.profilePic, (err) => {
        if (err) console.error(err);
      });
    }

    deleteAllLikes(user.username);
    await Post.deleteMany({ username: user.username });
    await User.findOneAndDelete({ username: user.username });

    res.clearCookie('access-token');
    res.clearCookie('refresh-token');

    res.status(200).json('User has been deleted');
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default settingsRouter;

async function deleteAllLikes(username: string) {
  const likedPosts = await Post.find({ likes: username });
  likedPosts.forEach(async (post) => {
    post.likes = post.likes.filter((upvoter) => upvoter === username);

    const postAuthor = await User.findOne({ username: post.authorName });
    if (!postAuthor?.blog?.likes) return;
    postAuthor.blog.likes--;
    postAuthor.save();
  });
}

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
