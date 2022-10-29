import { Document, ObjectId } from 'mongoose';

export type TCategory = {
  name: string;
  postsAmount: number;
};

export interface Category extends Document, TCategory {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  _doc: TCategory & {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };
}
