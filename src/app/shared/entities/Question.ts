import {Answer} from "./Answer";
import {QuestionCategory} from "../enums/QuestionCategory";

export class Question {
  id!: string;
  question!: string;
  answers?: Answer[];
  idUser?: string;
  idSpec?: number;
  category?: QuestionCategory;
}
