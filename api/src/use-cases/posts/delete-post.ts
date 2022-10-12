import fs from 'fs';
import { findPost } from './find-post';

export const deletePost = async (id: string, username: string) => {
  const post = await findPost(id);
  if ('err' in post) return post;

  if (username !== post.authorName) return { err: 'No access', status: 403 };

  if (post.image) fs.unlink(post.image, (err) => err && console.error(err));

  await post.delete();
};
