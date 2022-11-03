import { formatPost, SearchParams, SearchPosts } from 'use-cases/lib';

type SearchPostsParams = {
  userId?: string;
  getAll?: boolean;
};

export const searchPosts = async (
  query: Partial<SearchParams>,
  params?: SearchPostsParams
) => {
  const finalQuery = params?.getAll ? { ...query, page: null } : query;
  const searchPosts = new SearchPosts(finalQuery);
  const searchResult = await searchPosts.getPosts();

  const values = searchResult.posts.map((post) =>
    formatPost(post, params?.userId)
  );

  return { values, total: searchResult.total };
};
