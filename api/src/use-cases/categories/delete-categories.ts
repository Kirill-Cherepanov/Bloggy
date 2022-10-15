import Category from 'models/Category';

export const deleteCategories = async (deleteCategories: string[]) => {
  const categories = await Category.find({ name: deleteCategories });

  return Promise.allSettled(
    categories.map(async (category) => {
      if (category.postsAmount === 1) await category.remove();
      else category.postsAmount--;
      return await category.save();
    })
  );
};
