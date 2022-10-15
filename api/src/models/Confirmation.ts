import mongoose from 'mongoose';

import { Confirmation } from 'types/custom';

const ConfirmationSchema = new mongoose.Schema<Confirmation>(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

ConfirmationSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 1200 });

const Confirmation = mongoose.model<Confirmation>(
  'Confirmation',
  ConfirmationSchema
);
export default Confirmation;
