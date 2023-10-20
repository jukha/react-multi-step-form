/* eslint-disable */
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
  totalBill: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "NEXT":
      if (state.currentStep === 3) {
        return { ...state, currentStep: 3 };
      } else return { ...state, currentStep: state.currentStep + 1 };
    case "PREVIOUS":
      return { ...state, currentStep: state.currentStep - 1 };
    case "SKIP_TO_PLAN_STEP":
      return { ...state, currentStep: 1 };
    case "SORT_BILL_ARRAY": {
      const sortedArray = [...state.bill].sort((a, b) => {
        return a.type === "plan" ? -1 : 1;
      });

      return {
        ...state,
        bill: sortedArray,
      };
    }
    case "SET_PLAN":
      return { ...state, currentPlan: action.payload };
    case "SET_ADDONS":
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
    case "TOTAL_BILL": {
      const billSum = state.bill.reduce((acc, item) => item.charges + acc, 0);
      return { ...state, totalBill: billSum };
    }
    case "TOGGLE_PLAN_DURATION":
      if (state.planDuration === "monthly") {
        return { ...state, planDuration: "yearly" };
      } else return { ...state, planDuration: "monthly" };
    case "INCREMENT_BILL":
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
      totalBill,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  function nextStep() {
    dispatch({ type: "NEXT" });
  }
  function prevStep() {
    dispatch({ type: "PREVIOUS" });
  }

  function incrementBill(bills) {
    dispatch({ type: "INCREMENT_BILL", payload: bills });
  }
  function togglePlanDuration() {
    dispatch({ type: "TOGGLE_PLAN_DURATION" });
  }
  function setPlan(planNo) {
    dispatch({ type: "SET_PLAN", payload: planNo });
  }
  function setAddons(addons) {
    dispatch({ type: "SET_ADDONS", payload: addons });
  }
  function sortBillArray() {
    dispatch({ type: "SORT_BILL_ARRAY" });
  }
  function skipToPlanStep() {
    dispatch({ type: "SKIP_TO_PLAN_STEP" });
  }
  function calcTotalBill() {
    dispatch({ type: "TOTAL_BILL" });
  }
  return (
    <FormContext.Provider
      value={{
        steps,
        currentStep,
        nextStep,
        prevStep,
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
        skipToPlanStep,
        totalBill,
        calcTotalBill,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export { FormProvider, FormContext };
