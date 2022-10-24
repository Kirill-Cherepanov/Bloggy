import mongoose from 'mongoose';

import { Image } from 'types/custom';

const ImageSchema = new mongoose.Schema<Image>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      contentType: String,
      data: Buffer,
    },
  },
  { timestamps: true, versionKey: false, autoIndex: true }
);

const Image = mongoose.model<Image>('Category', ImageSchema);
export default Image;
