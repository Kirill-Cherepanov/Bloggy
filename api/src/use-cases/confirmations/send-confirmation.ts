import Confirmation from 'models/Confirmation';
import { sendConfirmationMessage } from 'web/nodemailer';

export const sendConfirmation = async (toEmail: string) => {
  const message = await sendConfirmationMessage(toEmail);

  new Confirmation({ toEmail, message }).save();

  return { success: true };
};
