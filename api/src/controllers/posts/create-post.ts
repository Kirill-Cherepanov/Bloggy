import fs from 'fs';
import path from 'path';
import { RequestHandler } from 'express';

import { addPost } from 'use-cases/posts';
import { findUser } from 'use-cases/users';

// Need to somehow refactor this one
import { validateJsonBlob } from 'utility/validations';

export const createPost: RequestHandler = async (req, res) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    const user = await findUser(req.user.data);
    if ('err' in user) return res.status(user.status).json(user.err);
    if (!user.blog) return res.status(403).json("User doesn't have a blog");

    const jsonBuffer = await validateJsonBlob(req.files);
    if (!jsonBuffer) return res.status(400).json('Incorrect request');

    const sentData = JSON.parse(jsonBuffer.buffer.toString());
    let imageName: string | undefined = undefined;

    if ('post-image' in req.files!) {
      const file = req.files!['post-image'][0];

      const imageName =
        path.parse(file.originalname).name +
        `.${Date.now()}` +
        path.extname(file.originalname);

      const filePath = path.join(__dirname, `/images/postImgs/'${imageName}`);

      fs.writeFile(filePath, file.buffer, (err) => {
        if (!err) return;
        console.error(err);
        throw Error('Server error');
      });
    }

    const post = addPost(sentData, user.username, imageName);

    res.status(200).json({ success: true, post });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
};
