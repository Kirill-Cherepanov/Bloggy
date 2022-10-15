import Category from 'models/Category';

export const addCategories = (addCategories: string[]) => {
  return Promise.allSettled(
    addCategories.map(async (addCategory) => {
      const category = await Category.findOne({ name: addCategory });
      if (!category) return new Category({ name: addCategory }).save();
      category.postsAmount++;
      return await category.save();
    })
  );
};
