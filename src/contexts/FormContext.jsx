import { createContext, useReducer } from "react";

const FormContext = createContext();

const initialState = {
  steps: [
    { no: 1, name: "your info" },
    { no: 2, name: "select plan" },
    { no: 3, name: "add-ons" },
    { no: 4, name: "summary" },
  ],
  bill: [],
  currentStep: 0,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "next":
      return { ...state, currentStep: state.currentStep + 1 };
    case "previous":
      return { ...state, currentStep: state.currentStep - 1 };
    case "setError":
      return { ...state, error: true };
    case "removeError":
      return { ...state, error: false };
    case "incrementBill":
      return { ...state, bill: [...state.bill, action.payload] };
    default:
      throw new Error("Unknown action type");
  }
}

function FormProvider({ children }) {
  const [{ steps, currentStep, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function nextStep() {
    dispatch({ type: "next" });
  }
  function prevStep() {
    dispatch({ type: "previous" });
  }
  function setError() {
    dispatch({ type: "setError" });
  }
  function removeError() {
    dispatch({ type: "removeError" });
  }
  function incrementBill(bill) {
    dispatch({ type: "incrementBill", payload: bill });
  }
  return (
    <FormContext.Provider
      value={{
        steps,
        currentStep,
        error,
        nextStep,
        prevStep,
        setError,
        removeError,
        incrementBill,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export { FormProvider, FormContext };
