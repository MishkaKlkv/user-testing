import {Question} from "./Question";
import {QuestionCategory} from "../enums/QuestionCategory";

export class Test {
  id!: string;
  name!: string;
  timeForCompetition!: number;
  category!: QuestionCategory
  questions!: Question[];

  idUser?: number;
  passingScore?: number;
  dateIn?: Date;
  dateCor?: Date;
  datePassage?: Date;
  prValid?: number;
}
