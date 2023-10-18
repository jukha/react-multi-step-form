import { useState } from "react";

import "./App.css";
import StepCounter from "./components/StepCounter";
import PersonalInfo from "./components/PersonalInfo";

const steps = [
  { no: 1, name: "your info" },
  { no: 2, name: "select plan" },
  { no: 3, name: "add-ons" },
  { no: 4, name: "summary" },
];

function App() {
  const [currStep, setCurrStep] = useState(1);
  function handleStepClick(stepNo) {
    setCurrStep(stepNo);
  }
  return (
    <div className="container">
      <aside>
        <ol>
          {steps.map((step) => (
            <StepCounter
              key={step.no}
              stepNo={step.no}
              name={step.name}
              isActive={step.no === currStep ? true : false}
              onClick={handleStepClick}
            />
          ))}
        </ol>
      </aside>
      <main>{currStep === 1 && <PersonalInfo />}</main>
    </div>
  );
}

export default App;
