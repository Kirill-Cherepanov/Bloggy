import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
      minLength: [1, 'Title must be 1 character at least'],
      maxLength: [100, 'Title must be 100 characters at most'],
      index: 'text',
    },
    text: {
      type: String,
      maxLength: [10000, 'Text must be 10000 characters at most'],
    },
    description: {
      type: String,
      maxLength: [300, 'Description must be 300 characters at most'],
    },
    image: String,
    authorName: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    categories: {
      type: [String],
      default: [],
      validate: {
        validator: (categories: string[]) => categories.length <= 10,
        message: 'Must be 10 categories at most',
      },
      index: 1,
    },
    displayType: {
      type: Number,
      min: 0,
      max: 2,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false, autoIndex: true }
);

const Post = mongoose.model<Post>('Post', PostSchema);
export default Post;
