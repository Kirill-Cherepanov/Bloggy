import bcrypt from 'bcrypt';

import Post from 'models/Post';
import User from 'models/User';
import { deleteProfilePic } from 'web/file-manipulation';

export const deleteUser = async (id: string, oldPassword: string) => {
  const user = await User.findById(id);
  if (user === null) return { err: 'User was not found', status: 500 };

  const validationResult = await bcrypt.compare(oldPassword, user.password);
  if (!validationResult) {
    return { err: 'Incorrect previous password', status: 400 };
  }

  if (user.profilePic) deleteProfilePic(user.profilePic);

  // delete all likes
  const likedPosts = await Post.find({ likes: user.username });
  likedPosts.forEach(async (post) => {
    post.likes = post.likes.filter((upvoter) => upvoter === user.username);

    const postAuthor = await User.findOne({ username: post.authorName });
    if (!postAuthor?.blog?.likes) {
      return console.error(`Author of post ${post._id} doesn't exist`);
    }
    postAuthor.blog.likes--;
    postAuthor.save();
  });

  await Post.deleteMany({ authorName: user.username });
  await User.findOneAndDelete({ username: user.username });

  return { success: true };
};
