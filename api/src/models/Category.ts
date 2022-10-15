import mongoose from 'mongoose';

import { Category } from 'types/custom';

const CategorySchema = new mongoose.Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    postAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

CategorySchema.index({ updatedAt: 1 }, { expireAfterSeconds: 1200 });

const Category = mongoose.model<Category>('Category', CategorySchema);
export default Category;
