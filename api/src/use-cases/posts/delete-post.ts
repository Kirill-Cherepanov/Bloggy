import fs from 'fs';

import Post from 'models/Post';
import User from 'models/User';

export const deletePost = async (postId: string, username: string) => {
  const post = await Post.findById(postId);
  if (!post) return { err: 'Post was not found', status: 500 };

  if (username !== post.authorName) return { err: 'No access', status: 403 };

  const author = await User.findOne({ username: post.authorName });
  if (author?.blog) author.blog.likes -= post.likes.length;
  else {
    console.error(
      "Author of the post or blog doesn't exist. Proceeding to delete the post"
    );
  }

  if (post.image) fs.unlink(post.image, (err) => err && console.error(err));

  await post.delete();

  return { success: true };
};
