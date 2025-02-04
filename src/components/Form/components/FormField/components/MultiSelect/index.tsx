import {Field} from "../../../../types";
import {useForm} from "../../../../useFormContext";
import {errorStyles} from "../../const";
import {Label} from "../Label";

export const MultiSelectField: React.FC<{field: Field}> = ({field}) => {
  const {handleChange, errors} = useForm();
  const hasError = !!errors[field.name];

  return (
    <>
      <Label field={field} />
      <select
        className="input-style"
        multiple
        disabled={field.disabled}
        required={field.required}
        onChange={(e) =>
          handleChange(
            field.name,
            Array.from(e.target.selectedOptions, (opt) => opt.value)
          )
        }
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
