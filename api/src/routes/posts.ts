import Post from '../models/Post';
import express from 'express';
const postsRouter = express.Router();
import { validatePost } from '../utility/validations';
import searchPosts, { SearchParams } from '../utility/postSearch';

// create post
postsRouter.post('/', async (req, res) => {
  // ADD AUTHORIZATION
  // Check if req.body.authorName is the same person as the authorized one
  validatePost(req.body);

  try {
    const newPost = new Post(req.body as TPost);
    res.status(200).json(await newPost.save());
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
postsRouter.put('/:id', async (req, res) => {
  // ADD AUTHORIZATION
  const { title, text, image, authorName, categories, displayType }: TPost =
    req.body;

  validatePost(req.body);

  try {
    const post = await Post.findById(req.params.id);
    if (post === null) {
      return res.status(500).json(`Post was not found`);
    }
    // Check if post.authorName is the same person as the authorized one

    post.overwrite({ title, text, image, categories, displayType });
    res.status(200).json(await post.save());
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
postsRouter.delete('/:id', async (req, res) => {
  // ADD AUTHORIZATION
  try {
    const post = await Post.findById(req.params.id);
    if (post === null) {
      return res.status(500).json(`Post was not found`);
    }
    // Check if post.authorName is the same person as the authorized one

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

// get all posts / get posts by category / get posts by username
postsRouter.get('/', async (req, res) => {
  const posts = searchPosts(req.query as SearchParams);

  const username = req.query.user;
  const category = req.query.category;
  try {
    if (username) return res.status(200).json(await Post.find({ username }));

    if (category) {
      const posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
      return res.status(200).json(posts);
    }

    res.status(200).json(await Post.find());
  } catch (err) {
    res.status(500).json(err);
  }
});

export default postsRouter;
