import { useState } from "react";
import useForm from "../contexts/useForm";
import styles from "./SelectPlan.module.css";

const plans = [
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
];

function SelectPlan() {
  const { nextStep, prevStep, incrementBill } = useForm();
  const [planDuration, setPlanDuration] = useState("monthly");
  const [currPlan, setCurrPlan] = useState(0);

  function handleToggle() {
    if (planDuration === "monthly") setPlanDuration("yearly");
    else setPlanDuration("monthly");
  }

  function handleNext() {
    // {name: 'arcade', type: 'plan', charges: '9'}
    const bill = {
      name: plans[currPlan].name,
      type: "plan",
      duration: planDuration,
      charges:
        planDuration === "monthly"
          ? plans[currPlan].monthlyCharges
          : plans[currPlan].yearlyCharges,
    };
    incrementBill(bill);
    nextStep();
    console.log('hi');
  }

  return (
    <>
      <h3 className="header">Select your plan</h3>
      <p className="para">You have the option of monthly or yearly billing.</p>
      <div className={styles.plansWrapper}>
        {plans.map((plan) => {
          return (
            <a
              key={plan.id}
              className={`${styles.plan} ${
                plan.id === currPlan ? styles.active : ""
              }`}
              onClick={() => setCurrPlan(plan.id)}
            >
              <img src={plan.icon} />
              <h3>{plan.name}</h3>
              {planDuration === "monthly" && <p>${plan.monthlyCharges}/mo</p>}
              {planDuration === "yearly" && (
                <>
                  <p>${plan.yearlyCharges}/yr</p>
                  <p style={{ color: "var(--marine-blue)", marginTop: "10px" }}>
                    2 months free
                  </p>
                </>
              )}
            </a>
          );
        })}
      </div>
      <div className={styles.durationToggler}>
        <span className={`${planDuration === "monthly" ? styles.active : ""}`}>
          Monthly
        </span>
        <label className={styles.switch}>
          <input type="checkbox" onChange={handleToggle} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <span className={`${planDuration === "yearly" ? styles.active : ""}`}>
          Yearly
        </span>
      </div>
      <div className="actions">
        <a className="btn btn-back" onClick={prevStep}>
          Go Back
        </a>
        <a className="btn btn-next" onClick={handleNext}>
          Next Step
        </a>
      </div>
    </>
  );
}

export default SelectPlan;
