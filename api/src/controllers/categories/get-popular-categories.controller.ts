import { RequestHandler } from 'express';
import { getPopularCategories } from 'use-cases/categories';

export const getPopularCategoriesConroller: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const categories = await getPopularCategories();
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};
