import { RequestHandler } from 'express';

import { generateAccessToken, generateRefreshToken } from 'web/tokens';
import { makeUser } from 'entity-validators/user';
import {
  sendConfirmation,
  validateConfirmation,
  deleteConfirmations,
} from 'use-cases/confirmations';
import { addUser } from 'use-cases/users';

export const registerController: RequestHandler = async (req, res, next) => {
  try {
    const shouldSendAgain: unknown = req.body.shouldSendAgain;
    const message: unknown = req.body.confirmationMessage;
    if (typeof message !== 'string' && message !== undefined) {
      return res.status(400).json('Incorrect confirmation message');
    }

    const user = await makeUser(req.body);

    if (shouldSendAgain || !message) {
      await deleteConfirmations(user.email);
      await sendConfirmation(user.email);
      return res.status(200).json({ status: 'message sent' });
    }

    const confirmationResult = await validateConfirmation(user.email, message);

    if (confirmationResult === null) {
      await sendConfirmation(user.email);
      return res
        .status(500)
        .json(
          'Confirmation message was not found. Probably expired. A new message was sent'
        );
    }

    if (!confirmationResult) {
      return res.status(400).json('Incorrect verification message');
    }

    const newUser = await addUser(user);

    const refreshToken = generateRefreshToken({ ...user, id: newUser._id });
    const accessToken = generateAccessToken({ ...user, id: newUser._id });
    res.cookie('refresh-token', refreshToken, { httpOnly: true });
    res.cookie('access-token', accessToken, { httpOnly: true });

    res.status(200).json({ user: newUser, status: 'success' });
  } catch (err) {
    next(err);
  }
};
