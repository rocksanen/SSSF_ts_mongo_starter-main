import Animal from "./Animal";
import Category from "./Category";
import {Species} from "./Species";

export default interface DBMessageResponse {
  message: string;
  data: Category | Category[] | Animal | Animal[] | Species | Species[];
}
