import * as z from 'zod';
import { RequestHandler } from 'express';

import { findUser, updateUserNoValidation } from 'use-cases/users';
import {
  deleteConfirmations,
  sendConfirmation,
  validateConfirmation,
} from 'use-cases/confirmations';
import { setAccessToken, setRefreshToken } from 'web/tokens';

const resetPasswordSchema = z.object({
  email: z.string(),
  newPassword: z.string().optional(),
  shouldSendAgain: z.boolean().optional(),
  confirmationMessage: z.string().optional(),
});

export const resetPasswordController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      newPassword,
      shouldSendAgain,
      confirmationMessage: message,
    } = resetPasswordSchema.parse(req.body);

    const user = await findUser({ email });
    if (!user) return res.status(500).json('User was not found');

    if (shouldSendAgain || !message) {
      await deleteConfirmations(email);
      await sendConfirmation(email);
      return res.status(200).json({ status: 'message sent' });
    }

    const confirmationResult = await validateConfirmation(email, message);

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

    if (!newPassword) return res.status(400).json('New password was not sent');

    const updatedUser = await updateUserNoValidation(
      { password: newPassword },
      { email }
    );

    if ('err' in updatedUser) {
      return res.status(updatedUser.status).json(updatedUser.err);
    }

    setRefreshToken(res, { ...updatedUser, id: user._id.toString() });
    setAccessToken(res, { ...updatedUser, id: user._id.toString() });

    res.status(200).json({ user: updatedUser, status: 'success' });
  } catch (err) {
    next(err);
  }
};
