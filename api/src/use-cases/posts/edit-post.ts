import { makePost } from 'entity-validators';
import deepmerge from 'deepmerge';

import Post from 'models/Post';
import { formatPost } from 'use-cases/lib';

export const editPost = async (
  postId: string,
  data: unknown,
  image?: string
) => {
  const post = await Post.findById(postId);
  if (!post) return post;

  deepmerge.all([post, makePost(data), { image }]);

  await post.save();

  return formatPost(post, post.authorName);
};
