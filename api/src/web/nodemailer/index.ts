import nodemailer from 'nodemailer';

import { EMAIL, EMAIL_PASSWORD } from 'config';

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

const MESSAGES = [
  'You are cool!',
  'You are the best!',
  'You are so beautiful!',
  'Everyone loves you! <3',
  'You are wonderful!',
  'Your smile is contagious!',
  'You light up the room!',
  'You are like sunshine on a rainy day!',
  'Colors seem brighter when you are around!',
  'You are a candle in the darkness!',
  'You are my reason to smile!',
  'I am so proud of you, and I hope you are too!',
  'You deserve a hug right now!',
  'You are just awesome!',
  'Our community is better because you are in it!',
  'You are a gift to those around you!',
  'On a scale from 1 to 10, you are an 11!',
  'You are an incredible human!',
  'You are one of a kind!',
  'There is ordinary, and then there is you!',
];

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
