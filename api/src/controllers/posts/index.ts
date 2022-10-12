import express from 'express';

import { uploadPostFields } from 'middleware';

import { createPost } from './create-post';

const postsRouter = express.Router();

postsRouter.post('/', uploadPostFields, createPost);

export { postsRouter };
