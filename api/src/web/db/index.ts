import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to db');
  } catch (err) {
    console.error(err);
  }
};
