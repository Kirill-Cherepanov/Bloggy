import Post from '../models/Post';
import express from 'express';
const postsRouter = express.Router();

// create post
postsRouter.post('/', async (req, res) => {
  const validationResult = validatePost(req.body as TPost);
  if (!validationResult.res) {
    return res.status(401).json('Invalid post: ' + validationResult.message);
  }

  const newPost = new Post(req.body as TPost);
  try {
    res.status(200).json(await newPost.save());
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

    if (post.authorName !== req.body.authorName) {
      return res.status(401).json('You can update only your post!');
    }

    const validationResult = validatePost(req.body as TPost);
    if (!validationResult.res) {
      return res.status(401).json('Invalid post: ' + validationResult.message);
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

    if (post.authorName !== req.body.authorName) {
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
    res.status(200).json(await Post.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post search
const newSearchParams = {
  type: ['posts', 'blogs'],
  search: ['categories', 'posts', 'both'],
  sort: ['popularity', 'new'],
  time: ['week', 'month', 'year', 'all'],
};

const newQueryUrl =
  'http://localhost:5000/api/posts?q=post&type=posts&search=categories&sort=new&time=all';
const oldQueryUrl =
  'http://localhost:5000/api/posts?category=Science&username=KissMe';

// get all posts / get posts by category / get posts by username
postsRouter.get('/', async (req, res) => {
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

function validatePost(postData: TPost): { res: boolean; message: string } {
  // const postData: TPost = {
  //   title: req.body.title,
  //   text: req.body.text,
  //   image: req.body.image,
  //   authorName: req.body.authorName,
  //   likes: req.body.likes,
  //   categories: req.body.categories,
  //   displayType: req.body.displayType,
  // };
  return { res: false, message: 'Not implemented' };
}
