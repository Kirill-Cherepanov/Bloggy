import bcrypt from 'bcrypt';
import deepmerge from 'deepmerge';

import { makePartialUser } from 'entity-validators/user';
import User from 'models/User';
import { deleteProfilePic } from 'web/file-manipulation';
import { FindUserProps } from './find-user';
import { formatUserProtected } from 'use-cases/lib';

export const updateUserNoValidation = async (
  data: unknown,
  findUserData: FindUserProps,
  shouldDeleteBlog: boolean = false
) => {
  const user = await User.findOne(findUserData);
  if (user === null) return { err: 'User was not found', status: 500 };

  const userData = makePartialUser(data);

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
