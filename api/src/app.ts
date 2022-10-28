import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import { PORT } from 'config';
import { connectDb } from 'web/db';
import {
  handleTokens,
  handleMiddlewareErrors,
  corsMiddleware,
} from 'web/middleware';
import { initFileDirectories } from 'web/file-manipulation';
import usersRouter from 'controllers/users';
import postsRouter from 'controllers/posts';
import searchRouter from 'controllers/search';
import authRouter from 'controllers/auth';
import settingsRouter from 'controllers/settings';
import categoriesRouter from 'controllers/categories';

initFileDirectories();

connectDb();

const app = express();

app.use(corsMiddleware);
app.use('/api/images', express.static('images'));

app.use(express.json());
app.use(cookieParser());
app.use(handleTokens);

app.use('/api/health-check', (req, res, next) => {
  res.status(200).json('The server is up and running');
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/search', searchRouter);
app.use('/api/categories', categoriesRouter);
app.use(handleMiddlewareErrors);

app.listen(PORT, () => console.log(`Backend is running at port ${PORT}`));

fetch('https://api.ipify.org?format=json').then(async (data) => {
  console.log(`Current IP address: ${(await data.json()).ip}`);
});
