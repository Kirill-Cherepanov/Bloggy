import bcrypt from 'bcrypt';

import Post from 'models/Post';
import User from 'models/User';
import { deleteCategories } from 'use-cases/categories';
import { deletePostImage, deleteProfilePic } from 'web/file-manipulation';

export const deleteUser = async (id: string, oldPassword: string) => {
  const user = await User.findById(id);
  if (user === null) return { err: 'User was not found', status: 500 };

  const validationResult = await bcrypt.compare(oldPassword, user.password);
  if (!validationResult) {
    return { err: 'Incorrect previous password', status: 400 };
  }

  if (user.profilePic) deleteProfilePic(user.profilePic);

  deleteUserLikes(user.username);
  deleteUserPosts(user.username);
  await User.findOneAndDelete({ username: user.username });

  return { success: true };
};

const deleteUserLikes = async (username: string) => {
  const likedPosts = await Post.find({ likes: username });
  likedPosts.forEach(async (post) => {
    post.likes = post.likes.filter((upvoter) => upvoter === username);

    const postAuthor = await User.findOne({ username: post.authorName });
    if (!postAuthor?.blog?.likes) {
      return console.error(`Author of post ${post._id} doesn't exist`);
    }
    postAuthor.blog.likes--;
    postAuthor.save();
  });
};

const deleteUserPosts = async (authorName: string) => {
  const posts = await Post.find({ authorName });

  posts.forEach((post) => {
    if (post.image) deletePostImage(post.image);
    deleteCategories(post.categories);
  });

  await Post.deleteMany({ authorName });
};
