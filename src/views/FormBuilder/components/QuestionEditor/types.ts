import {FieldType, SelectOption} from "../../../../components/Form/types";

export type QuestionValues = {
  title: string;
  name: string;
  description: string;
  required: boolean;
};

export interface Question {
  id: string;
  title: string;
  type: FieldType;
  description?: string;
  required: boolean;
  options?: SelectOption[];
}

export interface QuestionEditorProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: (questionId: string) => void;
}
