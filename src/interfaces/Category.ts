// TODO: interface for Category
import { Document } from "mongoose";

interface Category extends Document  {
    category_name: string;
}

export default Category;
