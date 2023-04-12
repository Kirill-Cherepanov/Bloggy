import { ObjectId } from 'mongoose';

import User from 'models/User';
import { formatUserProtected, deleteUndefined } from 'use-cases/lib';

export type FindUserProps = {
  username?: string;
  _id?: ObjectId;
  email?: string;
};

export const findUser = async (userData: FindUserProps) => {
  const user = await User.findOne(deleteUndefined(userData));

  if (!user) return user;

  return formatUserProtected(user);
};
