import nodemailer from 'nodemailer';
import Confirmation from '../models/Confirmation';
import { validateEmail } from './validations';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const getNewMessage = () => 'You are cool!';
const getMailMessage = (email: string, message: string) => ({
  to: email,
  subject: 'Confirm Email',
  html: `<h1>Your confirmation message</h1><p>Message: ${message}</p><p><small>This message will expire in 20 minutes</small></p>`,
});

const sendNewConfirmation = (email: string) => {
  const message = getNewMessage();

  new Confirmation({
    email,
    message,
  }).save();

  transporter.sendMail(getMailMessage(email, message));
};

export const handleEmailVerification = async (
  email: string,
  message: string
): Promise<{ res: boolean; message: string }> => {
  if (!validateEmail(email)) return { res: false, message: 'Incorrect email' };

  const confirmation = await Confirmation.findOne({ email });

  if (confirmation === null) {
    sendNewConfirmation(email);
    return {
      res: false,
      message: `Email verification message was sent to ${email}`,
    };
  }

  if (message === null || message === undefined) {
    await Confirmation.findOneAndDelete({ email });

    sendNewConfirmation(email);

    return {
      res: false,
      message: `Email verification message was sent to ${email}`,
    };
  }

  if (confirmation.message !== message) {
    return { res: false, message: 'Incorrect verification message' };
  }

  return { res: true, message: 'Verification passed' };
};
