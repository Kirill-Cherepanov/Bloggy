import mongoose from 'mongoose';

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail,
        message: 'Invalid email adress!'
      }
    },
    password: {
      type: String,
      required: true,
      min: [6, 'Password must be at least 6 characters'],
      max: [30, 'Password must be at most 30 characters']
    },
    profilePic: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export default UserSchema;
