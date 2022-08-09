import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: [1, 'Title must be 1 character at least'],
      max: [100, 'Title must be 100 characters at most']
    },
    desc: {
      type: String,
      max: [10000, 'Description must be 10000 characters at most']
    },
    photo: String,
    username: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    categories: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length <= 10,
        message: 'Must be 10 categories at most'
      }
    }
  },
  { timestamps: true }
);

export default PostSchema;
