import { Document } from 'mongoose';

export type TCategory = {
  name: string;
  postsAmount: number;
};

export interface Category extends Document, TCategory {
  _id: import('mongoose').ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}
