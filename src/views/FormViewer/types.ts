import {Question} from "../FormBuilder/components/QuestionEditor/types";

export interface FormData {
  id: string;
  questions: Question[];
  createdAt: string;
  name: string;
}
