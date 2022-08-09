import Category from '../models/Category';
import express from 'express';
const categoriesRouter = express.Router();

categoriesRouter.post('/', async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    res.status(200).json(await newCategory.save());
  } catch (err) {
    res.status(500).json(err);
  }
});

categoriesRouter.get('/', async (req, res) => {
  try {
    res.status(200).json(await Category.find());
  } catch (err) {
    res.status(500).json(err);
  }
});

export default categoriesRouter;
