import "./App.css";
import StepCounter from "./components/StepCounter";
import PersonalInfo from "./components/PersonalInfo";
import useForm from "./contexts/useForm";
import SelectPlan from "./components/SelectPlan";
import PickAddons from "./components/PickAddons";
import FinishUp from "./components/FinishUp";
import Thankyou from "./components/Thankyou";

function App() {
  const { bill, currentStep, steps } = useForm();
  return (
    <div className="container">
      <aside>
        <ol>
          {steps.map((step) => (
            <StepCounter
              key={step.no}
              stepNo={step.no}
              name={step.name}
              isActive={currentStep + 1 === step.no ? true : false}
            />
          ))}
        </ol>
      </aside>
      <main>
        {currentStep === 0 && <PersonalInfo />}
        {currentStep === 1 && <SelectPlan />}
        {currentStep === 2 && <PickAddons />}
        {currentStep === 3 && bill.length !== 0 && <FinishUp />}
        {currentStep === 3 && bill.length === 0 && <Thankyou />}
      </main>
    </div>
  );
}

export default App;
