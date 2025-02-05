import {ChangeEvent, useCallback} from "react";
import {Field} from "../../../../types";
import {useForm} from "../../../../useFormContext";
import {errorStyles} from "../../const";
import {Label} from "../Label";

export const SelectField: React.FC<{field: Field}> = ({field}) => {
  const {handleChange, errors, values} = useForm();
  const hasError = !!errors[field.name];

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) =>
      handleChange(field.name, e.target.value),
    [field.name, handleChange]
  );

  return (
    <>
      <Label field={field} />
      <select
        className="input-style"
        name={field.name}
        disabled={field.disabled}
        required={field.required}
        onChange={onChange}
        style={errorStyles(hasError)}
        value={values[field.name] as string}
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
