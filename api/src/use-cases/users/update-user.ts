import bcrypt from 'bcrypt';

import User from 'models/User';
import { makePartialUser } from 'entity-validators';
import { formatUserProtected, deepmerge } from 'use-cases/lib';
import { deleteProfilePic } from 'web/file-manipulation';

export const updateUser = async (
  data: unknown,
  id: string,
  oldPassword?: string,
  shouldDeleteBlog: boolean = false,
  verifyPassword: boolean = true
) => {
  const user = await User.findById(id);
  if (user === null) return { err: 'User was not found', status: 500 };

  const userData = makePartialUser(data);

  if (
    (userData.password || userData.email || userData.username) &&
    verifyPassword
  ) {
    if (!oldPassword) return { err: 'Old password was not sent', status: 400 };

    const validationResult = await bcrypt.compare(oldPassword, user.password);
    if (!validationResult) {
      return { err: 'Incorrect previous password', status: 400 };
    }
  }

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
