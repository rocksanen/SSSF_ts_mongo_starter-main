// TODO: interface for Species
import { Point } from "geojson";
import { Types, Document } from "mongoose";

interface Species extends Document{
    species_name: string;
    category: Types.ObjectId;
    image: string;
    location: Point;
}

interface SpeciesInput {
    species_name: string;
    category: Types.ObjectId;
    image: string;
    location: Point;
}


export  {Species, SpeciesInput};
