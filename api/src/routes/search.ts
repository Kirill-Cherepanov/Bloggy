import express from 'express';

import { SearchBlogs, SearchParams, SearchPosts } from '../utility/SearchDb';
import { verifyAccessToken } from '../utility/jsonTokens';

const searchRouter = express.Router();

// search blogs and posts
searchRouter.get('/', async (req, res) => {
  try {
    const verificationRes = await verifyAccessToken(
      req.cookies['access-token']
    );

    if (req.query.type === 'posts' || !req.query.type) {
      return res
        .status(200)
        .json(await findPosts(req.query, verificationRes.id));
    }
    if (req.query.type === 'blogs') {
      return res.status(200).json(await findBlogs(req.query));
    }

    res.status(400).json(`There is not ${req.query.type} here`);
  } catch (err: any) {
    console.error(err);
    if (err && typeof err === 'object' && 'message' in err) {
      res.status(500).json(err.message);
    }
  }
});

export default searchRouter;

async function findPosts(query: Partial<SearchParams>, id?: string) {
  const searchPosts = new SearchPosts(query);
  const searchResult = await searchPosts.getPosts();

  const sentPostsData: ClientTPost[] = searchResult.posts.map((post) => ({
    ...post._doc,
    likes: post.likes.length,
    isLiked: !!id && post.likes.includes(id),
  }));

  return { values: sentPostsData, total: searchResult.total, type: 'posts' };
}

async function findBlogs(query: Partial<SearchParams>) {
  const searchBlogs = new SearchBlogs(query);
  const searchResult = await searchBlogs.getBlogs();

  const blogs = searchResult.blogs.map((blog) => {
    const { password, email, __v, _id, updatedAt, ...publicInfo } = blog._doc;
    return publicInfo;
  });

  return { values: blogs, total: searchResult.total, type: 'blogs' };
}
