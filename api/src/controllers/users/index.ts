import express from 'express';

import { getBlogController } from './get-blog.controller';

const usersRouter = express.Router();

usersRouter.get('/:username', getBlogController);

export default usersRouter;
