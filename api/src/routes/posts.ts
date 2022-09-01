import Post from '../models/Post';
import express from 'express';
const postsRouter = express.Router();
import { SearchPosts } from '../utility/SearchDb';

const authorName = 'test';

// create post
postsRouter.post('/', async (req, res) => {
  // ADD AUTHORIZATION
  // Check if req.body.authorName is the same person as the authorized one
  const newPostData = getPostData(req.body);

  try {
    const newPost = new Post({ ...newPostData, ...{ authorName } });
    res.status(200).json(await newPost.save());
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
postsRouter.put('/:id', async (req, res) => {
  // ADD AUTHORIZATION
  // Check if post.authorName is the same person as the authorized one
  const updatedPostData = getPostData(req.body);

  try {
    const post = await Post.findById(req.params.id);
    if (post === null) return res.status(500).json(`Post was not found`);

    Object.assign(post, updatedPostData);

    res.status(200).json(await post.save());
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
postsRouter.delete('/:id', async (req, res) => {
  // ADD AUTHORIZATION
  // Check if post.authorName is the same person as the authorized one
  try {
    const post = await Post.findById(req.params.id);
    if (post === null) return res.status(500).json(`Post was not found`);

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
    newPostData.categories = [...new Set(postData.categories)].filter((c) => c);
  }

  return newPostData;
}
