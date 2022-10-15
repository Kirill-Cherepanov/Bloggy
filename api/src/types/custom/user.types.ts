import { Document, ObjectId } from 'mongoose';

export type TBlog = {
  likes: number;
  categories: string[];
  description: string;
};

export interface Blog extends Document, TBlog {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}

export type TUser = {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  blog?: TBlog;
};

export interface User extends Document, TUser {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}
