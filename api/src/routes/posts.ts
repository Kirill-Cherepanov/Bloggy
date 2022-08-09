import Post from '../models/Post';
import express from 'express';
const postsRouter = express.Router();

// create post
postsRouter.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    res.status(200).json(await newPost.save()); // Not sure if this'll work
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
postsRouter.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post === null) {
      return res.status(500).json(`Post by id ${req.params.id} was not found`);
    }
    if (post.username !== req.body.username) {
      return res.status(401).json('You can update only your post!');
    }

    try {
      post.overwrite(req.body);
      res.status(200).json(await post.save());
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
postsRouter.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post === null) {
      return res.status(500).json(`Post by id ${req.params.id} was not found`);
    }
    if (post.username !== req.body.username) {
      return res.status(401).json('You can delete only your post!');
    }

    try {
      await post.delete();
      res.status(200).json('Post has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post
postsRouter.get('/:id', async (req, res) => {
  try {
    // Not sure if this'll work
    res.status(200).json(await Post.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts
postsRouter.get('/', async (req, res) => {
  const username = req.query.user;
  const category = req.query.category;
  try {
    if (username) return res.status(200).json(await Post.find({ username }));

    if (category) {
      const posts = await Post.find({
        categories: {
          $in: [category]
        }
      });
      return res.status(200).json(posts);
    }

    res.status(200).json(await Post.find());
  } catch (err) {
    res.status(500).json(err);
  }
});

export default postsRouter;
