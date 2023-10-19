import { useContext } from "react";
import { FormContext } from "./FormContext";

function useForm() {
  const context = useContext(FormContext);
  if (context === undefined)
    throw new Error("FormContext was used outside of the FormProvider");
  return context;
}

export default useForm;
