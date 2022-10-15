import Category from 'models/Category';
import { Category as CategoryType } from 'types/custom';
import { formatCategory } from 'use-cases/lib';

export const getPopularCategories = async (amount?: number) => {
  let categories: CategoryType[] = [];
  if (!amount) categories = await Category.find().sort({ postsAmount: 1 });
  else {
    categories = await Category.find().sort({ postsAmount: 1 }).limit(amount);
  }
  return categories.map((category) => formatCategory(category));
};
