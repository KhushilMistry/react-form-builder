import {Field} from "../../../../types";
import {useForm} from "../../../../useFormContext";
import {errorStyles} from "../../const";
import {Label} from "../Label";

export const SelectField: React.FC<{field: Field}> = ({field}) => {
  const {handleChange, errors} = useForm();
  const hasError = !!errors[field.name];

  return (
    <>
      <Label field={field} />
      <select
        className="input-style"
        name={field.name}
        disabled={field.disabled}
        required={field.required}
        onChange={(e) => handleChange(field.name, e.target.value)}
        style={errorStyles(hasError)}
      >
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
};
