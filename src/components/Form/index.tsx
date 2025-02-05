import {useImperativeHandle, forwardRef} from "react";
import {FormProps, FormRef, Field, FormValues, FormContextType} from "./types";
import {FormField} from "./components/FormField";
import {FormContext} from "./useFormContext";
import {useFormSubmit} from "./hooks/useFormSubmit";

export const FormProvider = forwardRef<FormRef, FormProps<FormValues>>(
  (props, ref) => {
    const {formName, fields} = props;
    const {handleSubmit, handleBlur, handleChange, values, errors} =
      useFormSubmit<FormValues>(props);

    useImperativeHandle(ref, () => ({
      submitForm: handleSubmit,
    }));

    const contextValue: FormContextType<FormValues> = {
      values,
      errors,
      handleChange,
      handleBlur,
    };

    return (
      <FormContext.Provider value={contextValue}>
        <form name={formName}>
          {fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
        </form>
      </FormContext.Provider>
    );
  }
);

export type {FormRef, Field};
