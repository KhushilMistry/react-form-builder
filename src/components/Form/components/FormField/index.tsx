import {Field, FieldType} from "../../types";
import {TextField} from "./components/TextInput";
import {SelectField} from "./components/Select";
import {MultiSelectField} from "./components/MultiSelect";
import {SwitchField} from "./components/Switch";
import "./styles.css";
import {ErrorMessage} from "./components/ErrorMessage";
import {useForm} from "../../useFormContext";
import {DescMessage} from "./components/DescMessage";
import {CustomField} from "./components/CustomField";

const FIELD_COMPONENTS: Record<FieldType, React.FC<{field: Field}>> = {
  text: TextField,
  number: TextField,
  date: TextField,
  select: SelectField,
  "multi-select": MultiSelectField,
  switch: SwitchField,
  custom: CustomField,
};

export const FormField: React.FC<{field: Field}> = ({field}) => {
  const Component = FIELD_COMPONENTS[field.type];
  const {errors} = useForm();

  return Component ? (
    <div className="form-field">
      <Component field={field} />
      <ErrorMessage message={errors[field.name]} />
      <DescMessage message={field.description} />
    </div>
  ) : null;
};
