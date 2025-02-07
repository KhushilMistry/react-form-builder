import {Field, SelectOption} from "../../../../../../types";

import "./styles.css";

interface DropdownProps {
  field: Field;
  toggleOption: (option: SelectOption) => void;
  selected: SelectOption[];
  isOpen: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  field,
  toggleOption,
  selected,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ul className="dropdown">
      {field.options?.map((option) => (
        <li
          key={option.value}
          className={`dropdown-item ${
            selected.some((item) => item.value === option.value)
              ? "selected"
              : ""
          }`}
          onClick={() => toggleOption(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};
