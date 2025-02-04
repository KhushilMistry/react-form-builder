import {Field} from "../../../../types";
import {useForm} from "../../../../useFormContext";
import {Label} from "../Label";
import "./styles.css";

export const SwitchField: React.FC<{field: Field}> = ({field}) => {
  const {values, handleChange} = useForm();

  return (
    <div className="switch-container">
      <Label field={field} inlineLabel />
      <label className="switch">
        <input
          type="checkbox"
          checked={!!values[field.name]}
          disabled={field.disabled}
          onChange={(e) => handleChange(field.name, e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
