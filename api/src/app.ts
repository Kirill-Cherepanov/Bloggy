import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import { handleMiddlewareErrors } from './utility/middleware';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import settingsRouter from './routes/settings';

const app = express();

mongoose
  .connect('mongodb://0.0.0.0/bloggydb' as string)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));

app.use(cookieParser());
app.use(express.json());
app.use('/api/images', express.static('images'));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/settings', settingsRouter);
app.use(handleMiddlewareErrors);

app.listen(5000, () => console.log('Backend is running'));
