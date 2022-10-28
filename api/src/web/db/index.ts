import mongoose from 'mongoose';

import { DB_LOCATION } from 'config';

export const connectDb = async () => {
  try {
    await mongoose.connect(DB_LOCATION);
    console.log('Connected to db');
  } catch (err) {
    console.error(err);
  }
};
