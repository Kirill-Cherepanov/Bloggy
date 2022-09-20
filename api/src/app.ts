import path from 'path';
import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { handleMiddlewareErrors } from './utility/middleware';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';

const app = express();

mongoose
  .connect('mongodb://0.0.0.0/bloggydb' as string)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));

app.use(cookieParser());
app.use(express.json());
app.use('/api/images', express.static(path.join(__dirname, '/images')));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use(handleMiddlewareErrors);

app.listen(5000, () => console.log('Backend is running'));
