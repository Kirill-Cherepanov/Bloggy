import express from 'express';

import { getPopularCategoriesConroller } from './get-popular-categories.controller';

const categoriesRouter = express.Router();

categoriesRouter.get('/', getPopularCategoriesConroller);

export default categoriesRouter;
