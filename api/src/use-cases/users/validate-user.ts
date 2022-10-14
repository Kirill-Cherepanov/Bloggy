import bcrypt from 'bcrypt';

import User from 'models/User';
import { formatUserProtected } from 'use-cases/lib';

type ValidateUserProps = {
  username?: string;
  email?: string;
};

export const validateUser = async (
  userData: ValidateUserProps,
  password: string
) => {
  const user = await User.findOne(userData);
  if (!user) return null;

  const validated = await bcrypt.compare(password, user.password);
  if (!validated) return null;

  return formatUserProtected(user);
};
