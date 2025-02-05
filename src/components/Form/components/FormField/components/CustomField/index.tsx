import {Field} from "../../../../types";
import {useForm} from "../../../../useFormContext";

export const CustomField: React.FC<{field: Field}> = ({field}) => {
  const {values, handleChange} = useForm();

  if (!field.customRederer) {
    return null;
  }

  return <>{field.customRederer({values, field, handleChange})}</>;
};
