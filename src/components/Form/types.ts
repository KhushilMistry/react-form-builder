export type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "multi-select"
  | "switch"
  | "custom";

export type SelectOption = {
  value: string;
  label: string;
};

export type Field = {
  name: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  type: FieldType;
  options?: SelectOption[];
  customRederer?: React.FC<{
    field: Field;
    values: FormValues;
    handleChange: <K extends keyof FormValues>(
      name: K,
      value: FormValues[K]
    ) => void;
  }>;
};

export type FormValues = Record<
  string,
  string | number | boolean | SelectOption[]
>;

export type FormProps<T extends FormValues = FormValues> = {
  formName: string;
  fields: Field[];
  initialValues?: T;
  validate?: (values: T) => Record<string, string> | null;
  onSubmit?: (values: T) => void;
  onChange?: (values: T) => void;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  autoSave?: boolean;
  debounceMs?: number;
  focusErrorOnSubmit?: boolean;
};

export type FormContextType<T extends FormValues = FormValues> = {
  values: T;
  errors: Record<string, string>;
  handleChange: <K extends keyof T>(name: K, value: T[K]) => void;
  handleBlur: (name: keyof T) => void;
};

export type FormRef = {
  submitForm: () => boolean;
};
