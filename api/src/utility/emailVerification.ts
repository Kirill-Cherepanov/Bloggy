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

const MESSAGES = [
  'You are cool!',
  'You are the best!',
  'You are so beautiful!',
  'Everyone loves you! <3',
  'You are wonderful!',
];

const getNewMessage = () => {
  const randomIndex = Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[randomIndex];
};

const getMailMessage = (email: string, message: string) => ({
  from: process.env.GMAIL_USER,
  to: email,
  subject: 'Confirm Email',
  html: `<h1>Your confirmation message</h1><p style="
  font-size: 1.25rem;">Message: <b style="padding: 2px; background-color: #ccc;">${message}</b></p><p><i>This message will expire in 20 minutes</i></p>`,
});

const sendNewConfirmation = (email: string) => {
  const message = getNewMessage();

  new Confirmation({
    email,
    message,
  }).save();

  transporter.sendMail(
    getMailMessage(email, message),
    (err) => err ?? console.error(err)
  );
};

export const handleEmailVerification = async (
  email: string,
  message: string | undefined | null
): Promise<{ status: number; message: string }> => {
  if (!validateEmail(email)) return { status: 400, message: 'Incorrect email' };

  const confirmation = await Confirmation.findOne({ email });

  if (!confirmation) {
    sendNewConfirmation(email);
    return {
      status: 200,
      message: `message sent`,
    };
  }

  if (!message) {
    await Confirmation.findOneAndDelete({ email });

    sendNewConfirmation(email);

    return {
      status: 200,
      message: `message sent`,
    };
  }

  if (confirmation.message !== message) {
    return { status: 400, message: 'Incorrect verification message' };
  }

  return { status: 200, message: 'success' };
};
