import Post from 'models/Post';
import { formatPost } from 'use-cases/lib';

export const findPost = async (postId: string, userId?: string) => {
  return formatPost(await Post.findById(postId, userId));
};
