import {useState, useCallback, useMemo, useRef, useEffect} from "react";
import {Field, SelectOption} from "../../../../types";
import "./styles.css";
import {useForm} from "../../../../useFormContext";
import {IoChevronDownOutline} from "react-icons/io5";
import {IoCloseOutline} from "react-icons/io5";
import {Label} from "../Label";
import {errorStyles} from "../../const";

export const MultiSelectField: React.FC<{field: Field}> = ({field}) => {
  const {handleChange, errors, values} = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const hasError = !!errors[field.name];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => (values[field.name] as SelectOption[]) || [],
    [field.name, values]
  );

  const toggleOption = useCallback(
    (option: SelectOption) => {
      const newState = selected.some((item) => item.value === option.value)
        ? selected.filter((item) => item.value !== option.value)
        : [...selected, option];
      handleChange(field.name, newState);
    },
    [field.name, handleChange, selected]
  );

  const removeOption = useCallback(
    (e: React.MouseEvent, option: SelectOption) => {
      e.stopPropagation();
      const newState = selected.filter((item) => item.value !== option.value);
      handleChange(field.name, newState);
    },
    [field.name, handleChange, selected]
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

  return (
    <>
      <Label field={field} />
      <div className="multi-select" ref={dropdownRef}>
        <div
          className="select-box"
          onClick={() => setIsOpen(!isOpen)}
          style={errorStyles(hasError)}
        >
          {selected.length > 0 ? (
            <div className="selected-items">
              {selected.map((item) => (
                <span key={item.value} className="tag">
                  {item.label}
                  <button
                    className="remove-btn"
                    onClick={(e) => removeOption(e, item)}
                  >
                    <IoCloseOutline size={16} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="placeholder">Select options</span>
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
        )}
      </div>
    </>
  );
};
