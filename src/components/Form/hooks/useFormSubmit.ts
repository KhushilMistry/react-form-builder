import {useCallback, useEffect, useState} from "react";
import {FormProps} from "../types";

export const useFormSubmit = (props: FormProps) => {
  const {
    initialValues = {},
    onChange,
    autoSave,
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

  const markAsTouched = useCallback((name: string) => {
    setTouched((prev) => ({...prev, [name]: true}));
  }, []);

  const validateFields = useCallback(
    (
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
    },
    [fields, touched, validate, values]
  );

  const handleChange = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => {
        const updatedValues = {...prev, [name]: value};

        if (validateOnChange) {
          validateFields(updatedValues);
        }

        if (!autoSave) {
          onChange?.(updatedValues);
        }

        return updatedValues;
      });

      markAsTouched(name);
    },
    [autoSave, markAsTouched, onChange, validateFields, validateOnChange]
  );

  const handleBlur = useCallback(
    (name: string) => {
      markAsTouched(name);

      if (validateOnBlur) {
        validateFields();
      }
    },
    [markAsTouched, validateFields, validateOnBlur]
  );

  const handleSubmit = useCallback(() => {
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
  }, [fields, focusErrorOnSubmit, onSubmit, validateFields, values]);

  return {handleSubmit, handleBlur, handleChange, errors, values};
};
