import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import { handleTokens, handleMiddlewareErrors } from 'web/middleware';
import usersRouter from 'controllers/users';
import postsRouter from 'controllers/posts';
import searchRouter from 'controllers/search';
import authRouter from 'controllers/auth';
import settingsRouter from 'controllers/settings';
import categoriesRouter from 'controllers/categories';

const app = express();

mongoose
  .connect('mongodb://0.0.0.0/bloggydb' as string)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));

app.use(cookieParser());
app.use(express.json());
app.use(handleTokens);
app.use('/api/health-check', (req, res, next) => res.status(200));
app.use('/api/images', express.static('images'));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/search', searchRouter);
app.use('/api/categories', categoriesRouter);
app.use(handleMiddlewareErrors);

app.listen(5000, () => console.log('Backend is running'));
