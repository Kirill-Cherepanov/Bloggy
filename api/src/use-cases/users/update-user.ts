import bcrypt from 'bcrypt';

import User from 'models/User';
import { makePartialUser } from 'entity-validators/user';
import { formatUserProtected } from 'use-cases/lib';

export const updateUser = async (data: unknown) => {
  const user = await makePartialUser(data);

  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  const updatedUser = await new User({ user }).save();

  return formatUserProtected(updatedUser);
};
