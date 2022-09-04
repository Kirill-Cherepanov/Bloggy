import mongoose from 'mongoose';

const ConfirmationSchema = new mongoose.Schema<Confirmation>(
  {
    ip: {
      type: String,
      required: true,
    },
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

const Confirmation = mongoose.model<Confirmation>(
  'Confirmation',
  ConfirmationSchema
);
export default Confirmation;
