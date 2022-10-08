import express from 'express';
import path from 'path';
import fs from 'fs';

import Post from '../models/Post';
import { searchBlogPosts } from '../utility/SearchDb';
import { upload } from '../utility/middleware';
import { getCategories, validateJsonBlob } from '../utility/validations';
import { verifyAccessToken } from '../utility/jsonTokens';
import User from '../models/User';

const postsRouter = express.Router();

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
  try {
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const user = await User.findOne(verificationRes);
    if (!user?.blog) {
      return res.status(400).json("User doesn't have a blog or doesn't exist");
    }

    const jsonBuffer = await validateJsonBlob(req.files);
    if (!jsonBuffer) return res.status(400).json('Incorrect request');
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
        if (!err) return;
        console.error(err);
        throw Error('Server error');
      });
    }

    const newPost = new Post({ ...newPostData, authorName: user.username });
    await newPost.save();

    res.status(200).json({ success: true, post: newPost });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// update post
postsRouter.patch('/:id', uploadFields, async (req, res) => {
  try {
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const jsonBuffer = await validateJsonBlob(req.files);
    if (!jsonBuffer) throw Error('Incorrect request');
    const sentData: Partial<TPost> = JSON.parse(jsonBuffer.buffer.toString());

    const post = await Post.findById(req.params.id);
    if (post === null) return res.status(500).json(`Post was not found`);

    const updatedPostData = getPostData(sentData);

    if ('post-image' in req.files!) {
      const file = req.files!['post-image' as keyof typeof req.files][0];

      const imageLocation = './images/postImgs/';

      if (post.image) {
        fs.unlink(
          './images/postImgs/' + post.image,
          (err) => err && console.error(err)
        );
      }

      const filename =
        path.parse(file.originalname).name +
        `.${Date.now()}` +
        path.extname(file.originalname);

      updatedPostData.image = filename;

      const filePath = imageLocation + filename;

      fs.writeFile(filePath, file.buffer, (err) => {
        if (!err) return;
        console.error(err);
        throw Error('Server error');
      });
    }

    Object.assign(post, updatedPostData);
    await post.save();

    res.status(200).json({ success: true, post });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// delete post
postsRouter.delete('/:id', async (req, res) => {
  try {
    const verificationRes = await verifyAccessToken(req.body.accessToken);
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

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
    let isLoggedIn = false;
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );
    if (!verificationRes.err) isLoggedIn = true;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json('Post was not found');

    const author = await User.findOne({ username: post.authorName });
    if (!author) throw Error('Author of the post was not found');

    const otherPosts = (await searchBlogPosts(author.username, 1)).slice(0, 4);

    const sentPostData: ClientTPost = {
      ...post._doc,
      likes: post.likes.length,
      isLiked: isLoggedIn && post.likes.includes(verificationRes.id),
    };

    res.status(200).json({ post: sentPostData, author, otherPosts });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

// like/dislike a post
postsRouter.put('/like/:id', async (req, res) => {
  try {
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );
    if (verificationRes.err === true) {
      return res.status(verificationRes.status).json(verificationRes.message);
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json('Post was not found');

    const author = await User.findOne({ username: post.authorName });
    if (!author?.blog) {
      console.error(post);
      throw Error(`The post ${post._id} doesn't have an author?!`);
    }

    if (post.likes.includes(verificationRes.id)) {
      post.likes = post.likes.filter(
        (upvoter) => upvoter !== verificationRes.id
      );
      author.blog.likes--;
    } else {
      post.likes.push(verificationRes.id);
      author.blog.likes++;
    }

    post.save();
    author.save();

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default postsRouter;

function getPostData(postData: Partial<TPost>) {
  const { likes, authorName, ...newPostData } = postData;

  if (postData.categories) {
    newPostData.categories = getCategories(postData.categories).slice(0, 10);
  }

  return newPostData;
}
