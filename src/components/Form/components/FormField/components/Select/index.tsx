import {Field} from "../../../../types";
import {SelectedRendererType, BaseSelectField} from "../BaseSelect";
import "./styles.css";

const selectInpurRederer: SelectedRendererType = ({selected}) => {
  return <span className="selected-value">{selected[0].label}</span>;
};

export const SelectField: React.FC<{field: Field}> = ({field}) => {
  return (
    <BaseSelectField selectedRenderer={selectInpurRederer} field={field} />
  );
};
