import {Answer} from "./Answer";
import {QuestionCategory} from "../enums/QuestionCategory";

export class Question {
  id!: string;
  question!: string;
  category!: QuestionCategory;
  answers!: Answer[];
  idUser!: string;
}
