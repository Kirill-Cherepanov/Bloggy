import Post from '../../models/Post';

export const findPost = async (id: string) => {
  const post = await Post.findById(id);
  if (!post) return { err: 'Post was not found', status: 500 };
  return post;
};
