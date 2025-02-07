import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Field, FormValues, SelectOption} from "../../../../../types";
import {useForm} from "../../../../../useFormContext";

export const useBaseSelect = ({
  isMultiselect,
  field,
}: {
  isMultiselect?: boolean;
  field: Field;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {handleChange, values} = useForm<FormValues>();

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
  }, [setIsOpen]);

  const selected: SelectOption[] = useMemo(() => {
    if (isMultiselect) {
      return (values[field.name] || []) as SelectOption[];
    } else {
      const selected = values[field.name];
      const selectedOption = field.options?.find(
        (opt) => opt.value === selected
      );
      return selectedOption ? [selectedOption] : [];
    }
  }, [field.name, field.options, isMultiselect, values]);

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (isMultiselect) {
        const newState = selected.some((item) => item.value === option.value)
          ? selected.filter((item) => item.value !== option.value)
          : [...selected, option];
        handleChange(field.name, newState);
      } else {
        handleChange(field.name, option.value);
        setIsOpen(false);
      }
    },
    [field.name, handleChange, isMultiselect, selected]
  );

  const removeOption = useCallback(
    (e: React.MouseEvent, option: SelectOption) => {
      e.stopPropagation();
      const newState = selected.filter((item) => item.value !== option.value);
      handleChange(field.name, newState);
    },
    [field.name, handleChange, selected]
  );

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    dropdownRef,
    setIsOpen,
    selectOption,
    removeOption,
    selected,
    toggleOpen,
  };
};
