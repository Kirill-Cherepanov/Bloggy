import { RequestHandler } from 'express';

import { editPost } from 'use-cases/posts';
import { findUser } from 'use-cases/users';
import { savePostImage } from 'web/file-manipulation';
import { getJsonBuffer } from './lib';

export const updatePostController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user.isLoggedIn) {
      return res.status(req.user.err.statusCode).json(req.user.err.message);
    }

    const user = await findUser(req.user.data);
    if (!user) {
      return res.status(500).json('Author of the post was not found');
    }
    if (!user.blog) return res.status(403).json("User doesn't have a blog");

    const jsonBuffer = await getJsonBuffer(req.files);
    if (!jsonBuffer) return res.status(400).json('Incorrect request');

    const sentData = JSON.parse(jsonBuffer.buffer.toString());
    const imageName = savePostImage(req.files);

    const post = await editPost(req.params.id, sentData, imageName);

    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};
