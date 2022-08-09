import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import express from 'express';
const app = express();
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';

// dotenv.config();
app.use(express.json());
// app.use('./images', express.static('./images'));

mongoose
  .connect('mongodb://0.0.0.0/testdb' as string)
  .then(() => console.log('connected to db'))
  .catch((err) => console.error(err));

app.use('api/auth', authRouter);
app.use('api/users', usersRouter);
app.use('api/posts', postsRouter);
// app.use('api/categories')

app.listen(5000, () => console.log('listen on 5000'));
