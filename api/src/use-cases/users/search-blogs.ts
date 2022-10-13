import {
  formatPost,
  SearchParams,
  SearchBlogs,
  formatUser,
} from 'use-cases/lib';

export const searchBlogs = async (query: Partial<SearchParams>) => {
  const searchBlogs = new SearchBlogs(query);
  const searchResult = await searchBlogs.getBlogs();

  const values = searchResult.blogs.map((blog) => formatUser(blog, 'public'));

  return { values, total: searchResult.total };
};
