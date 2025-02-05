import {createContext, useContext} from "react";
import {FormContextType, FormValues} from "./types";

export const FormContext = createContext<FormContextType | null>(null);

export const useForm = <T extends FormValues>(): FormContextType<T> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context as unknown as FormContextType<T>;
};
