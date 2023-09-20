// TODO: Route for animals

import { Router } from 'express';
import { animalListGet, animalGet, animalPost, animalPut, animalDelete } from '../controllers/animalController';
import { body,param } from 'express-validator';

const router = Router();

router
    .route('/')
    .get(animalListGet)
    .post(
        body('animal_name').notEmpty().isString().escape(),
        body('species').notEmpty().isString().escape(),
        animalPost
    );

router
    .route('/:id')
    .get(animalGet)
    .put(
        param('id').isMongoId(),
        body('animal_name').isString().escape().optional(),
        body('species').isMongoId().optional(),
        body('birthdate').isDate().optional(),
        body('gender').isString().escape().optional(),
        animalPut
    )
    .delete(param('id').isMongoId,animalDelete);

export default router;


