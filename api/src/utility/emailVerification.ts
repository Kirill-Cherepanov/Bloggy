import nodemailer from 'nodemailer';
import Confirmation from '../models/Confirmation';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const handleEmailVerification = async (
  ip: string,
  email: string,
  message: string
): Promise<{ res: boolean; message: string }> => {
  const confirmation = await Confirmation.findOne({ ip: ip });

  const newMessage = 'You are cool!';
  const newMailMessage = {
    to: email,
    subject: 'Confirm Email',
    html: `<h1>Your confirmation message</h1><p>${newMessage}</p>`,
  };
  const sendNewConfirmation = () => {
    new Confirmation({
      ip: ip,
      email,
      newMessage,
    }).save();
    transporter.sendMail(newMailMessage);
  };

  if (confirmation === null) {
    sendNewConfirmation();
    return { res: false, message: 'Email verification message was sent' };
  }

  if (confirmation.email !== email) {
    await Confirmation.findOneAndDelete({ ip: ip });

    sendNewConfirmation();

    return {
      res: false,
      message: 'Email verification message was sent to a new address',
    };
  }

  if (confirmation.message !== message) {
    return { res: false, message: 'Incorrect verifiction message' };
  }

  return { res: true, message: 'Verification passed' };
};
