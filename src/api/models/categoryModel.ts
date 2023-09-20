// Schema for category model

import { Schema, model } from "mongoose";
import Category from "../../interfaces/Category";

const categorySchema = new Schema({
    category_name: {
        type: String,
        required: true,
        minLenght: 2,
    }
});

export default model<Category>('Category', categorySchema);
