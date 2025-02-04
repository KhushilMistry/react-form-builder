import {useImperativeHandle, forwardRef} from "react";
import {FormProps, FormRef, Field} from "./types";
import {FormField} from "./components/FormField";
import {FormContext} from "./useFormContext";
import {useFormSubmit} from "./hooks/useFormSubmit";

export const FormProvider = forwardRef<FormRef, FormProps>((props, ref) => {
  const {formName, fields} = props;
  const {handleSubmit, handleBlur, handleChange, values, errors} =
    useFormSubmit(props);

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
  }));

  return (
    <FormContext.Provider value={{values, errors, handleChange, handleBlur}}>
      <form name={formName}>
        {fields.map((field) => (
          <FormField key={field.name} field={field} />
        ))}
      </form>
    </FormContext.Provider>
  );
});

export type {FormRef, Field};
