import {Field} from "../../../../types";
import "./styles.css";

export const Label: React.FC<{field: Field; inlineLabel?: boolean}> = ({
  field,
  inlineLabel,
}) => {
  if (!field.label) {
    return null;
  }

  return (
    <label
      htmlFor={field.name}
      className={inlineLabel ? "inline-field-label" : "field-label"}
    >
      {field.label} {field.required && <span className="field-require">*</span>}
    </label>
  );
};
