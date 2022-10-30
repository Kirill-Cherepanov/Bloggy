import nodemailer from 'nodemailer';

import { EMAIL, EMAIL_PASSWORD, MESSAGES } from 'config';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmailMessage = (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  const emailMessage = {
    from: EMAIL,
    to,
    subject,
    html,
  };

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(emailMessage, (err) =>
      err ? reject(err) : resolve()
    );
  });
};

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[randomIndex];
};

export const sendConfirmationMessage = async (toEmail: string) => {
  const subject = 'Confirm Email';

  const randomMessage = getRandomMessage();

  const html = `<h1>Your confirmation message</h1><p style="
  font-size: 1.25rem;">Message: <b style="padding: 2px; background-color: #ccc;">${randomMessage}</b></p><p><i>This message will expire in 20 minutes</i></p>`;

  await sendEmailMessage(toEmail, subject, html);

  return randomMessage;
};
