import {useState, useCallback, useRef, useEffect} from "react";
import {Field, FormValues, SelectOption} from "../../../../types";
import "./styles.css";
import {useForm} from "../../../../useFormContext";
import {IoChevronDownOutline} from "react-icons/io5";
import {Label} from "../Label";
import {errorStyles} from "../../const";

export const SelectField: React.FC<{field: Field}> = ({field}) => {
  const {handleChange, errors, values} = useForm<FormValues>();
  const [isOpen, setIsOpen] = useState(false);
  const hasError = !!errors[field.name];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = values[field.name] as string;

  const selectOption = useCallback(
    (option: SelectOption) => {
      handleChange(field.name, option.value);
      setIsOpen(false);
    },
    [field.name, handleChange]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = field.options?.find((opt) => opt.value === selected);

  return (
    <>
      <Label field={field} />
      <div className="select-container" ref={dropdownRef}>
        <div
          className="select-box"
          onClick={() => setIsOpen(!isOpen)}
          style={errorStyles(hasError)}
        >
          {selectedOption ? (
            <span className="selected-value">{selectedOption.label}</span>
          ) : (
            <span className="placeholder">Select an option</span>
          )}
          <IoChevronDownOutline
            className={`chevron-icon ${isOpen ? "open" : ""}`}
            size={20}
          />
        </div>

        {isOpen && (
          <ul className="dropdown">
            {field.options?.map((option) => (
              <li
                key={option.value}
                className={`dropdown-item ${
                  selected === option.value ? "selected" : ""
                }`}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
