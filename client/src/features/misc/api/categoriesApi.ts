import { rootApi } from 'lib/rootApi';
import { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

type GetCategoriesReturnType = {
  categories: {
    name: string;
    amount: number;
  }[];
};

export const categoriesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesReturnType, void>({
      providesTags: provideGetCategoriesTags,
      query: () => ({
        url: '/categories',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;

function provideGetCategoriesTags(
  result?: GetCategoriesReturnType
): TagDescription<'Post' | 'User' | 'Category'>[] {
  if (!result) return ['Category'];

  const categoriesTags = result.categories.map((category) => ({
    type: 'Category' as const,
    id: category.name,
  }));

  return [...categoriesTags, 'Category'];
}
