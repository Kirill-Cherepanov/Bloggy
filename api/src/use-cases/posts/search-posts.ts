import { formatPost, SearchParams, SearchPosts } from 'use-cases/lib';

export const searchPosts = async (
  query: Partial<SearchParams>,
  userId?: string
) => {
  const searchPosts = new SearchPosts(query);
  const searchResult = await searchPosts.getPosts();

  const values = searchResult.posts.map((post) => formatPost(post));

  return { values, total: searchResult.total };
};
