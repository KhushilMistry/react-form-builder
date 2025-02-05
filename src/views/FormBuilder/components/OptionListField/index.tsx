import {MdDelete, MdAdd} from "react-icons/md";
import {Field, SelectOption} from "../../../../components/Form/types";
import "./styles.css";

export const OptionsListField: React.FC<{
  field: Field;
  values: Record<string, unknown>;
  handleChange: (name: string, value: unknown) => void;
}> = ({field, values, handleChange}) => {
  const options = (values[field.name] as SelectOption[]) || [];

  const addOption = () => {
    const newOptions = [...options, {value: "", label: ""}];
    handleChange(field.name, newOptions);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = {
      value: value.toLowerCase().replace(/\s+/g, "-"),
      label: value,
    };
    handleChange(field.name, newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    handleChange(field.name, newOptions);
  };

  return (
    <div className="options-list-field">
      <label className="field-label">{field.label}</label>
      <div className="options-container">
        {options.map((option, index) => (
          <div key={index} className="option-row">
            <input
              type="text"
              value={option.label}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder="Enter option"
              className="input-style"
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="icon-button delete"
            >
              <MdDelete size={20} />
            </button>
          </div>
        ))}
        <button type="button" onClick={addOption} className="add-option-button">
          <MdAdd size={20} /> Add Option
        </button>
      </div>
    </div>
  );
};
