import express from 'express';
import path from 'path';
import fs from 'fs';

import Post from '../models/Post';
import { SearchPosts } from '../utility/SearchDb';
import { upload } from '../utility/middleware';
import { getCategories, validateJsonBlob } from '../utility/validations';
import { verifyAccessToken } from '../utility/jsonTokens';

const postsRouter = express.Router();

const authorName = 'test';

const uploadFields = upload.fields([
  {
    name: 'post-image',
    maxCount: 1,
  },
  {
    name: 'request-json',
    maxCount: 1,
  },
]);

// create post
postsRouter.post('/', uploadFields, async (req, res) => {
  const verificationRes = await verifyAccessToken(req.body.accessToken);
  if (verificationRes.err === true) {
    return res.status(verificationRes.status).json(verificationRes.message);
  }

  if (verificationRes.username !== req.params.username) {
    return res.status(403).json('No access');
  }

  try {
    const jsonBuffer = await validateJsonBlob(req.files);
    if (!jsonBuffer) throw Error('Incorrect request');
    const sentData: Partial<TPost> = JSON.parse(jsonBuffer.buffer.toString());

    const newPostData = getPostData(sentData);

    if ('post-image' in req.files!) {
      const file = req.files!['post-image' as keyof typeof req.files][0];

      const filename =
        path.parse(file.originalname).name +
        `.${Date.now()}` +
        path.extname(file.originalname);

      newPostData.image = filename;

      const filePath = './images/postImgs/' + filename;

      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) throw err;
      });
    }

    const newPost = new Post({ ...newPostData, ...{ authorName } });
    res.status(200).json(await newPost.save());
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
postsRouter.put('/:id', uploadFields, async (req, res) => {
  const verificationRes = await verifyAccessToken(req.body.accessToken);
  if (verificationRes.err === true) {
    return res.status(verificationRes.status).json(verificationRes.message);
  }

  if (verificationRes.username !== req.params.username) {
    return res.status(403).json('No access');
  }

  try {
    const jsonBuffer = await validateJsonBlob(req.files);
    if (!jsonBuffer) throw Error('Incorrect request');
    const sentData: Partial<TPost> = JSON.parse(jsonBuffer.buffer.toString());

    const post = await Post.findById(req.params.id);
    if (post === null) return res.status(500).json(`Post was not found`);

    const updatedPostData = getPostData(sentData);

    if ('post-image' in req.files!) {
      if (post.image) {
        fs.unlink(post.image, (err) => {
          if (err) console.error(err);
        });
      }

      const file = req.files!['post-image' as keyof typeof req.files][0];

      const filename =
        path.parse(file.originalname).name +
        `.${Date.now()}` +
        path.extname(file.originalname);

      updatedPostData.image = filename;

      const filePath = './images/postImgs/' + filename;

      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) throw err;
      });
    }

    Object.assign(post, updatedPostData);

    res.status(200).json(await post.save());
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
postsRouter.delete('/:id', async (req, res) => {
  const verificationRes = await verifyAccessToken(req.body.accessToken);
  if (verificationRes.err === true) {
    return res.status(verificationRes.status).json(verificationRes.message);
  }

  try {
    const post = await Post.findById(req.params.id);
    if (post === null) return res.status(500).json(`Post was not found`);

    if (verificationRes.username !== post.authorName) {
      return res.status(403).json('No access');
    }

    if (post.image) {
      fs.unlink(post.image, (err) => {
        if (err) console.error(err);
      });
    }

    await post.delete();
    res.status(200).json('Post has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post
postsRouter.get('/:id', async (req, res) => {
  try {
    res.status(200).json(await Post.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
});

// search posts TESTED
postsRouter.get('/', async (req, res) => {
  try {
    const searchPosts = new SearchPosts(req.query);
    const posts = await searchPosts.getPosts();
    res.status(200).json(posts);
  } catch (err: any) {
    res.status(500).json(err.toString());
  }
});

export default postsRouter;

function getPostData(postData: Partial<TPost>) {
  // Check if req.body.authorName is the same person as the authorized one
  const { likes, authorName, ...newPostData } = postData;

  if (postData.categories) {
    newPostData.categories = getCategories(postData.categories);
  }

  return newPostData;
}
