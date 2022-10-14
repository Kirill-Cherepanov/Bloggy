import express from 'express';

import { uploadPostFields } from 'web/middleware';

import { createPostController } from './create-post.controller';
import { updatePostController } from './update-post.controller';
import { deletePostController } from './delete-post.controller';
import { getPostController } from './get-post.controller';
import { likePostController } from './like-post.controller';

const postsRouter = express.Router();

postsRouter.post('/', uploadPostFields, createPostController);
postsRouter.patch('/:id', uploadPostFields, updatePostController);
postsRouter.delete('/:id', deletePostController);
postsRouter.get('/:id', getPostController);
postsRouter.put('/like/:id', likePostController);

export default postsRouter;
