import {Field} from "../../../../types";
import {useForm} from "../../../../useFormContext";
import {errorStyles} from "../../const";
import {Label} from "../Label";

export const TextField: React.FC<{field: Field}> = ({field}) => {
  const {values, errors, handleChange, handleBlur} = useForm();
  const hasError = !!errors[field.name];

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
        onChange={(e) => handleChange(field.name, e.target.value)}
        onBlur={() => handleBlur(field.name)}
        style={errorStyles(hasError)}
      />
    </>
  );
};
