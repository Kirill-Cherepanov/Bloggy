import bcrypt from 'bcrypt';

import { makePartialUser } from 'entity-validators';
import User from 'models/User';
import { deleteProfilePic } from 'web/file-manipulation';
import { FindUserProps } from './find-user';
import { formatUserProtected, deleteUndefined, deepmerge } from 'use-cases/lib';

export const updateUserNoValidation = async (
  data: unknown,
  findUserData: FindUserProps,
  shouldDeleteBlog: boolean = false
) => {
  const user = await User.findOne(deleteUndefined(findUserData));
  if (user === null) return { error: 'User was not found', status: 500 };

  const userData = makePartialUser(data);

  if ('error' in userData) return userData;

  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }

  if (user.profilePic && userData.profilePic) deleteProfilePic(user.profilePic);

  if (shouldDeleteBlog) {
    delete user.blog;
    delete userData.blog;
  }

  deepmerge(user, userData);

  const updatedUser = await user.save();

  return formatUserProtected(updatedUser);
};
