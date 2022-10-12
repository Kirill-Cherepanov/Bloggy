import { makePost } from 'entity-validators';
import { deepmerge } from 'deepmerge-ts';
import { findPost } from './find-post';

export const editPost = async (id: string, data: unknown) => {
  const post = await findPost(id);

  if ('err' in post) return post;

  deepmerge(post, makePost(data));

  await post.save();

  return post;
};
