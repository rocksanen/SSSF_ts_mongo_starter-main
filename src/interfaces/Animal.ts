// TODO: interface for Animal

import { Types } from "mongoose";

interface Animal extends Document {
    animal_name: string;
    species: Types.ObjectId;
    birthdate: Date;
    gender: 'Male' | 'Female'
}

export default Animal;
