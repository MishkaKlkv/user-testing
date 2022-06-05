import {Question} from "./Question";

export interface Test {
  id: string;
  name: string;
  timeForCompetition: number;
  questions?: Question[];

  idSpec?: number;
  idUser?: number;
  passingScore?: number;
  dateIn?: Date;
  dateCor?: Date;
  datePassage?: Date;
  prValid?: number;
}
