import express from 'express';

import { searchController } from './search.controller';

const searchRouter = express.Router();

searchRouter.get('/', searchController);

export default searchRouter;
