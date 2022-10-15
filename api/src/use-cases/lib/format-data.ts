import { TPost, Post, User } from 'types/custom';

type FormattedPost = Omit<TPost, 'likes'> & {
  _id: string;
  likes: number;
  isLiked: boolean;
};

export const formatPost = (
  post: Post | null,
  userId?: string
): FormattedPost | null => {
  if (!post) return post;

  return {
    ...post._doc,
    _id: post._id.toString(),
    likes: post.likes.length,
    isLiked: !!userId && post.likes.includes(userId),
  };
};

export const formatUserProtected = (user: User) => {
  const { password, updatedAt, ...protectedData } = user._doc;

  return { ...protectedData, _id: protectedData._id.toString() };
};

export const formatUserPublic = (user: User) => {
  const { email, ...publicData } = formatUserProtected(user)!;

  return publicData;
};
