import {useEffect, useState} from "react";
import {FormProps} from "../types";

export const useFormSubmit = (props: FormProps) => {
  const {
    initialValues = {},
    autoSave,
    onChange,
    debounceMs = 300,
    fields,
    onSubmit,
    focusErrorOnSubmit = true,
    validate,
    validateOnBlur = true,
    validateOnChange = true,
  } = props;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (autoSave && onChange) {
      const handler = setTimeout(() => onChange(values), debounceMs);
      return () => clearTimeout(handler);
    }
  }, [values, autoSave, debounceMs, onChange]);

  const markAsTouched = (name: string) => {
    setTouched((prev) => ({...prev, [name]: true}));
  };

  const validateFields = (
    currentValues: Record<string, unknown> = values,
    forceValidateAll = false
  ) => {
    const validationErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && (forceValidateAll || touched[field.name])) {
        if (!currentValues[field.name]) {
          validationErrors[field.name] = `${
            field.label || field.name
          } is required`;
        }
      }
    });

    if (validate) {
      const customErrors = validate(currentValues) || {};
      for (const key in customErrors) {
        if (forceValidateAll || touched[key]) {
          validationErrors[key] = customErrors[key];
        }
      }
    }

    setErrors(validationErrors);
    return validationErrors;
  };

  const handleChange = (name: string, value: unknown) => {
    setValues((prev) => {
      const updatedValues = {...prev, [name]: value};

      if (validateOnChange) {
        validateFields(updatedValues);
      }

      return updatedValues;
    });

    markAsTouched(name);
  };

  const handleBlur = (name: string) => {
    markAsTouched(name);

    if (validateOnBlur) {
      validateFields();
    }
  };

  const handleSubmit = () => {
    setTouched(
      fields.reduce((acc, field) => ({...acc, [field.name]: true}), {})
    );

    const validationErrors = validateFields(values, true);

    if (Object.keys(validationErrors).length > 0) {
      if (focusErrorOnSubmit) {
        const firstErrorField = Object.keys(validationErrors)[0];
        document.getElementsByName(firstErrorField)?.[0]?.focus();
      }
      return false;
    }

    onSubmit?.(values);

    return true;
  };

  return {handleSubmit, handleBlur, handleChange, errors, values};
};
