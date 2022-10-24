import { Document } from 'mongoose';

export type TImage = {
  name: string;
  type: 'post' | 'profile';
  image: string;
};

export interface Image extends Document, TImage {
  _id: import('mongoose').ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}
