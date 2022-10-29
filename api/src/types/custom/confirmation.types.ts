import { Document, ObjectId } from 'mongoose';

export type TConfirmation = {
  email: string;
  message: string;
};

export interface Confirmation extends Document, TConfirmation {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  _doc: TConfirmation & {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };
}
