import { makePost } from 'entity-validators';

import Post from 'models/Post';
import { formatPost, deepmerge } from 'use-cases/lib';
import { deletePostImage } from 'web/file-manipulation';

export const editPost = async (
  postId: string,
  data: unknown,
  userId: string,
  image?: string
) => {
  let post = await Post.findById(postId);
  if (!post) return post;

  const postData = makePost(data);

  if (post.image && image) deletePostImage(post.image);

  deepmerge(post, postData, { image });

  await post.save();

  return formatPost(post, userId);
};
