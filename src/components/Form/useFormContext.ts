import {createContext, useContext} from "react";
import {FormContextType} from "./types";

export const FormContext = createContext<FormContextType | null>(null);

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within a FormProvider");
  return context;
};
