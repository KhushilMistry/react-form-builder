import {IoCloseOutline} from "react-icons/io5";

import {Field} from "../../../../types";
import {SelectedRendererType, BaseSelectField} from "../BaseSelect";

import "./styles.css";

const multiSelectInpurRederer: SelectedRendererType = ({
  selected,
  removeOption,
}) => {
  return (
    <div className="selected-items">
      {selected.map((item) => (
        <span key={item.value} className="tag">
          {item.label}
          <button className="remove-btn" onClick={(e) => removeOption(e, item)}>
            <IoCloseOutline size={16} />
          </button>
        </span>
      ))}
    </div>
  );
};

export const MultiSelectField: React.FC<{field: Field}> = ({field}) => {
  return (
    <>
      <BaseSelectField
        isMultiselect
        selectedRenderer={multiSelectInpurRederer}
        field={field}
      />
    </>
  );
};
