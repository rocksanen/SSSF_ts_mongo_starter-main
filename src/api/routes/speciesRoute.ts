// TODO: route for species

import express from 'express';
import { speciesListGet, speciesGet, speciesPost, speciesPut, speciesDelete } from '../controllers/speciesController';
import {param, body} from 'express-validator';

const router = express.Router();

router
.route('/')
.get(speciesListGet)
.post(
    body('species_name').notEmpty().isString().escape(),
    body('category').isMongoId(),
    body('location').notEmpty().isObject(),speciesPost);

router
    .route('/:id')
    .get(param('id').isMongoId(), speciesGet)
    .put(
        param('id').isMongoId(),
        body('species_name').isString().escape().optional(),
        body('category').isMongoId().optional(),
        body('location').isObject().optional(),
        speciesPut
    )
    .delete(param('id').isMongoId(), speciesDelete);


export default router;

