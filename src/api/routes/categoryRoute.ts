// TODO: route for categories

import express from 'express';
import { categoryListGet, categoryGet, categoryPost, categoryPut, categoryDelete } from '../controllers/categoryController';
import {param, body} from 'express-validator';

const router = express.Router();

router
.route('/')
.get(categoryListGet)
.post(body('category_name').notEmpty().isString().escape(),categoryPost);

router
  .route('/:id')
  .get(param('id').isMongoId(), categoryGet)
  .put(
    param('id').isMongoId(),
    body('category_name').notEmpty().isString().escape(),
    categoryPut
  )
  .delete(param('id').isMongoId(), categoryDelete);


export default router;

