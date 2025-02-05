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
    values: Record<string, unknown>;
    handleChange: (name: string, value: unknown) => void;
  }>;
};

export type FormProps = {
  formName: string;
  fields: Field[];
  initialValues?: Record<string, unknown>;
  validate?: (values: Record<string, unknown>) => Record<string, string> | null;
  onSubmit?: (values: Record<string, unknown>) => void;
  onChange?: (values: Record<string, unknown>) => void;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  autoSave?: boolean;
  debounceMs?: number;
  focusErrorOnSubmit?: boolean;
};

export type FormContextType = {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  handleChange: (name: string, value: unknown) => void;
  handleBlur: (name: string) => void;
};

export type FormRef = {
  submitForm: () => boolean;
};
