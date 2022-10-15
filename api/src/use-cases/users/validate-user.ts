import bcrypt from 'bcrypt';

import User from 'models/User';
import { formatUserProtected, deleteUndefined } from 'use-cases/lib';
import { FindUserProps } from './find-user';

export const validateUser = async (
  userData: FindUserProps,
  password: string
) => {
  const user = await User.findOne(deleteUndefined(userData));
  if (!user) return null;

  const validated = await bcrypt.compare(password, user.password);
  if (!validated) return null;

  return formatUserProtected(user);
};
