import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
      min: [1, 'Title must be 1 character at least'],
      max: [100, 'Title must be 100 characters at most'],
    },
    text: {
      type: String,
      max: [10000, 'Description must be 10000 characters at most'],
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
        validator: (v: string[]) => v.length <= 10,
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
