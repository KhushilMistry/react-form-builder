import {ChangeEvent, useCallback} from "react";
import {Field, FormValues} from "../../../../types";
import {useForm} from "../../../../useFormContext";
import {errorStyles} from "../../const";
import {Label} from "../Label";

export const TextField: React.FC<{field: Field}> = ({field}) => {
  const {values, errors, handleChange, handleBlur} = useForm<FormValues>();
  const hasError = !!errors[field.name];

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      handleChange(field.name, e.target.value),
    [field.name, handleChange]
  );

  const onBlur = useCallback(
    () => handleBlur(field.name),
    [field.name, handleBlur]
  );

  return (
    <>
      <Label field={field} />
      <input
        className="input-style"
        type={field.type || "text"}
        name={field.name}
        value={(values[field.name] as string) || ""}
        disabled={field.disabled}
        required={field.required}
        onChange={onChange}
        onBlur={onBlur}
        style={errorStyles(hasError)}
        placeholder={field.label}
      />
    </>
  );
};
