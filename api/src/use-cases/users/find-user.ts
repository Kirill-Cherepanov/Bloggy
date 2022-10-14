import User from 'models/User';
import { formatUserProtected } from 'use-cases/lib';

export type FindUserProps = {
  username?: string;
  id?: string;
  email?: string;
};

export const findUser = async (userData: FindUserProps) => {
  const user = await User.findOne(userData);

  if (!user) return user;

  return formatUserProtected(user);
};
