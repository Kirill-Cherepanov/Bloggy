import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import authRouter from 'routes/auth';
import settingsRouter from 'routes/settings';
import searchRouter from 'routes/search';

// new
import { handleTokens, handleMiddlewareErrors } from 'middleware';
import usersRouter from 'controllers/users';
import postsRouter from 'controllers/posts';

const app = express();

mongoose
  .connect('mongodb://0.0.0.0/bloggydb' as string)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));

app.use(cookieParser());
app.use(express.json());
app.use(handleTokens);
app.use('/api/images', express.static('images'));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/search', searchRouter);
app.use(handleMiddlewareErrors);

app.listen(5000, () => console.log('Backend is running'));
