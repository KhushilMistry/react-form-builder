import {ChangeEvent, useCallback} from "react";
import {Field} from "../../../../types";
import {useForm} from "../../../../useFormContext";
import {Label} from "../Label";
import "./styles.css";

export const SwitchField: React.FC<{field: Field}> = ({field}) => {
  const {values, handleChange} = useForm();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      handleChange(field.name, e.target.checked),
    [field.name, handleChange]
  );

  return (
    <div className="switch-container">
      <Label field={field} inlineLabel />
      <label className="switch">
        <input
          type="checkbox"
          checked={!!values[field.name]}
          disabled={field.disabled}
          onChange={onChange}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
