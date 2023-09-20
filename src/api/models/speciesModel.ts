// TODO: Schema for species model

import { Schema, model } from "mongoose";
import {Species} from "../../interfaces/Species";

const speciesSchema = new Schema({
    species_name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

export default model<Species>('Species', speciesSchema);
