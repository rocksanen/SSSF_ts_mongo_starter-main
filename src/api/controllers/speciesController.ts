// TODO: Controller for species model

// 1. Create function to get all species
// 2. Create fuction to get species by id
// 3. Create function to create a new species
// 4. Create function to update a species by id
// 5. Create function to delete a species by id

import { Request, Response, NextFunction } from "express";
import CustomError from "../../classes/CustomError";
import {Species,SpeciesInput} from "../../interfaces/Species";
import SpeciesModel from "../models/speciesModel";
import DBMessageResponse from "../../interfaces/DBMessageResponse";
import { validationResult } from "express-validator";
import imageFromWikipedia from "../../functions/imageFromWikipedia";



const speciesListGet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const species = await SpeciesModel.find().select('-__v');
        if (!species || species.length === 0) {
            next(new CustomError('Species not found', 404));
            return;
        }
        res.status(200).json(species);
    } catch (error) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const speciesGet = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const messages = errors
                .array()
                .map((error) => `${error.msg}: ${error.param}`)
                .join(', ');
            next(new CustomError(messages, 400));
            return;

        }

        const species = await SpeciesModel.findById(req.params.id);
        if (!species) {
            next(new CustomError('Species not found', 404));
            return;
        }
        res.status(200).json(species);
    }
    catch (error) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const speciesPost = async (
    req: Request<{}, {}, Species>,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const messages = errors
                .array()
                .map((error) => `${error.msg}: ${error.param}`)
                .join(', ');
            next(new CustomError(messages, 400));
            return;

        }

        const image = await imageFromWikipedia(req.body.species_name)
        const speciesWithImage: SpeciesInput = {
            ...req.body,
            image
        }



        const species = await SpeciesModel.create(speciesWithImage);

        const output: DBMessageResponse = {
            message: 'Species created',
            data: species
        }
        res.status(201).json(output);
    } catch (error) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const speciesPut = async (
    req: Request<{ id: string }, {}, Species>,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const messages = errors
                .array()
                .map((error) => `${error.msg}: ${error.param}`)
                .join(', ');
            next(new CustomError(messages, 400));
            return;

        }

        const species = await SpeciesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!species) {
            next(new CustomError('Species not found', 404));
            return;
        }

        const output: DBMessageResponse = {
            message: 'Species updated',
            data: species
        }


        res.status(200).json(output);
    } catch (error) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const speciesDelete = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const messages = errors
                .array()
                .map((error) => `${error.msg}: ${error.param}`)
                .join(', ');
            next(new CustomError(messages, 400));
            return;

        }

        const species = await SpeciesModel.findByIdAndDelete(req.params.id);
        if (!species) {
            next(new CustomError('Species not found', 404));
            return;
        }

        const output: DBMessageResponse = {
            message: 'Species deleted',
            data: species
        }

        res.status(200).json(output);
    } catch (error) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

export { speciesListGet, speciesGet, speciesPost, speciesPut, speciesDelete };

