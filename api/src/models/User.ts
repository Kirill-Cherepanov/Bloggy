import mongoose from 'mongoose';
import { validateEmail } from '../utility/validations';

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, 'Username must be at least 3 characters long'],
      maxLength: [20, 'Username must be at most 20 characters long'],
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail,
        message: 'Invalid email address!',
      },
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: '',
    },
    blog: {
      type: {
        likes: {
          type: Number,
          required: true,
        },
        categories: {
          type: [String],
          default: [],
        },
        description: {
          type: String,
        },
        createdAt: {
          type: Date,
        },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', UserSchema);
export default User;
