type FormattedPost = Omit<TPost, 'likes'> & { likes: number; isLiked: boolean };

export const formatPost = (
  post: Post | null,
  userId?: string
): FormattedPost | null => {
  if (!post) return post;

  return {
    ...post._doc,
    likes: post.likes.length,
    isLiked: !!userId && post.likes.includes(userId),
  };
};

export type AccessLevelType = 'protected' | 'public';

export const formatUser = (
  user: User | null,
  accessLevel?: AccessLevelType
) => {
  if (!user) return user;

  const { password, email, _id, updatedAt, ...publicInfo } = user._doc;

  if (accessLevel === 'protected') return { ...publicInfo, email };
  return publicInfo;
};
