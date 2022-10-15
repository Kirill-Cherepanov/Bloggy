import { Document } from 'mongoose';

export type TConfirmation = {
  email: string;
  message: string;
};

export interface Confirmation extends Document, TConfirmation {
  _id: import('mongoose').ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}
