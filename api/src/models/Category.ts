import mongoose from 'mongoose';

import { Category } from 'types/custom';

const CategorySchema = new mongoose.Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    postsAmount: {
      type: Number,
      default: 1,
      index: 1,
    },
  },
  { timestamps: true, versionKey: false, autoIndex: true }
);

const Category = mongoose.model<Category>('Category', CategorySchema);
export default Category;
