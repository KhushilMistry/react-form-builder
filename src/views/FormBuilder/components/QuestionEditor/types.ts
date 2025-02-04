import {FieldType, SelectOption} from "../../../../components/Form/types";

export interface Question {
  id: string;
  title: string;
  type: FieldType;
  description?: string;
  required: boolean;
  options?: SelectOption[];
}
