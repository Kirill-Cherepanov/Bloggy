import bcrypt from 'bcrypt';

import User from 'models/User';
import Post from 'models/Post';
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
  if (user === null) return { error: 'User was not found', status: 500 };

  const userData = makePartialUser(data);

  if ('error' in userData) return userData;

  if ((userData.password || userData.email || userData.username) && verifyPassword) {
    if (!oldPassword) {
      return { error: 'Old password was not sent', status: 400 };
    }

    const validationResult = await bcrypt.compare(oldPassword, user.password);
    if (!validationResult) {
      return { error: 'Incorrect previous password', status: 400 };
    }
  }

  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }

  if (user.profilePic && userData.profilePic) deleteProfilePic(user.profilePic);

  if (shouldDeleteBlog) {
    user.blog = undefined;
    delete userData.blog;
  }

  if (userData.username) updatePostsAuthor(user.username, userData.username);

  deepmerge(user, userData);

  const updatedUser = await user.save();

  return formatUserProtected(updatedUser);
};

async function updatePostsAuthor(prevName: string, nextName: string) {
  await Post.updateMany({ authorName: prevName }, { $set: { authorName: nextName } });
}
