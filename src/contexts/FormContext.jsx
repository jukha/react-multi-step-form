import { createContext, useReducer } from "react";

const FormContext = createContext();

const initialState = {
  steps: [
    { no: 1, name: "your info" },
    { no: 2, name: "select plan" },
    { no: 3, name: "add-ons" },
    { no: 4, name: "summary" },
  ],
  plans: [
    {
      id: 0,
      name: "arcade",
      monthlyCharges: 9,
      yearlyCharges: 90,
      icon: "/icon-arcade.svg",
    },
    {
      id: 1,
      name: "advanced",
      monthlyCharges: 12,
      yearlyCharges: 120,
      icon: "/icon-advanced.svg",
    },
    {
      id: 2,
      name: "pro",
      monthlyCharges: 15,
      yearlyCharges: 150,
      icon: "/icon-pro.svg",
    },
  ],
  addons: [
    {
      id: 10,
      name: "Online service",
      description: "Access to multiplayer games",
      monthlyCharges: 1,
      yearlyCharges: 10,
    },
    {
      id: 20,
      name: "Local storage",
      description: "Extra 1TB of cloud service",
      monthlyCharges: 2,
      yearlyCharges: 20,
    },
    {
      id: 30,
      name: "Customizable Profile",
      description: "Custom theme on your profile",
      monthlyCharges: 2,
      yearlyCharges: 20,
    },
  ],
  bill: [],
  planDuration: "monthly",
  currentAddons: [],
  currentPlan: -1,
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
    case "SORT_BILL_ARRAY": {
      /* eslint-disable */
      const sortedArray = [...state.bill].sort((a, b) => {
        return a.type === "plan" ? -1 : 1;
      });

      return {
        ...state,
        bill: sortedArray,
      };
    }
    case "setPlan":
      return { ...state, currentPlan: action.payload };
    case "setAddons":
      if (Array.isArray(action.payload)) {
        let temp = [];
        for (let i = 0; i < action.payload.length; i++) {
          temp = [...temp, action.payload[i]];
        }
        return { ...state, currentAddons: temp };
      } else
        return {
          ...state,
          currentAddons: [...state.currentAddons, action.payload],
        };
    case "togglePlanDuration":
      if (state.planDuration === "monthly") {
        return { ...state, planDuration: "yearly" };
      } else return { ...state, planDuration: "monthly" };
    case "incrementBill":
      if (Array.isArray(action.payload)) {
        let temp = [];
        for (let i = 0; i < action.payload.length; i++) {
          temp = [...temp, action.payload[i]];
        }
        return { ...state, bill: temp };
      } else return { ...state, bill: [...state.bill, action.payload] };

    default:
      throw new Error("Unknown action type");
  }
}

function FormProvider({ children }) {
  const [
    {
      addons,
      currentAddons,
      currentPlan,
      plans,
      planDuration,
      bill,
      steps,
      currentStep,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
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
  function incrementBill(bills) {
    dispatch({ type: "incrementBill", payload: bills });
  }
  function togglePlanDuration() {
    dispatch({ type: "togglePlanDuration" });
  }
  function setPlan(planNo) {
    dispatch({ type: "setPlan", payload: planNo });
  }
  function setAddons(addons) {
    dispatch({ type: "setAddons", payload: addons });
  }
  function sortBillArray() {
    dispatch({ type: "SORT_BILL_ARRAY" });
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
        bill,
        planDuration,
        togglePlanDuration,
        currentPlan,
        plans,
        setPlan,
        addons,
        setAddons,
        currentAddons,
        sortBillArray,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export { FormProvider, FormContext };
