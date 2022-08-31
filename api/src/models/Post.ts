import mongoose from 'mongoose';
import { validateCategories } from '../utility/validations';

const PostSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
      minLength: [1, 'Title must be 1 character at least'],
      maxLength: [100, 'Title must be 100 characters at most'],
      index: true,
    },
    text: {
      type: String,
      maxLength: [10000, 'Description must be 10000 characters at most'],
    },
    image: String,
    authorName: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    categories: {
      type: [String],
      default: [],
      validate: {
        validator: validateCategories,
        message: 'Must be 10 categories at most',
      },
    },
    displayType: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<Post>('Post', PostSchema);
export default Post;
