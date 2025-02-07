import {Field, FormValues, SelectOption} from "../../../../types";
import "./styles.css";
import {useForm} from "../../../../useFormContext";
import {IoChevronDownOutline} from "react-icons/io5";
import {Label} from "../Label";
import {errorStyles} from "../../const";
import {Dropdown} from "./components/Dropdown";
import {useBaseSelect} from "./hooks";
import {ReactNode} from "react";

export type SelectedRendererType = ({
  removeOption,
  selected,
}: {
  removeOption: (e: React.MouseEvent, option: SelectOption) => void;
  selected: SelectOption[];
}) => ReactNode;

interface BaseSelectFieldProps {
  field: Field;
  selectedRenderer: SelectedRendererType;
  isMultiselect?: boolean;
}

export const BaseSelectField: React.FC<BaseSelectFieldProps> = ({
  field,
  selectedRenderer,
  isMultiselect,
}) => {
  const {errors} = useForm<FormValues>();
  const hasError = !!errors[field.name];

  const {setIsOpen, dropdownRef, isOpen, selected, selectOption, removeOption} =
    useBaseSelect({field, isMultiselect});

  return (
    <>
      <Label field={field} />
      <div className="select-container" ref={dropdownRef}>
        <div
          className="select-box"
          onClick={() => setIsOpen(!isOpen)}
          style={errorStyles(hasError)}
        >
          {selected.length ? (
            selectedRenderer({removeOption, selected})
          ) : (
            <span className="placeholder">Select an option</span>
          )}
          <IoChevronDownOutline
            className={`chevron-icon ${isOpen ? "open" : ""}`}
            size={20}
          />
        </div>

        <Dropdown
          isOpen={isOpen}
          field={field}
          toggleOption={selectOption}
          selected={selected}
        />
      </div>
    </>
  );
};
