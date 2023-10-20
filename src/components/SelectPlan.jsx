import useForm from "../contexts/useForm";
import styles from "./SelectPlan.module.css";

function SelectPlan() {
  const {
    bill,
    nextStep,
    planDuration,
    togglePlanDuration,
    prevStep,
    incrementBill,
    currentPlan,
    setPlan: setCurrentPlan,
    plans,
    error,
    setError,
    removeError,
  } = useForm();

  function handleToggle() {
    togglePlanDuration();
  }
  function handleNext() {
    if (!bill.length > 0) {
      setError();
      return;
    } else {
      removeError();
      // change duration of already added plan
      const updatedBill = bill.map((item) => {
        if (item.type === "plan") {
          console.log(
            "type plan found and state planDuration is",
            planDuration
          );
          return {
            ...item,
            duration: planDuration,
          };
        }
        return item;
      });
      incrementBill(updatedBill);
      nextStep();
    }
  }
  function handleClick(currPlanId) {
    setCurrentPlan(currPlanId);
    const planBill = {
      id: plans[currPlanId].id,
      name: plans[currPlanId].name,
      type: "plan",
      duration: planDuration,
      charges:
        planDuration === "monthly"
          ? plans[currPlanId].monthlyCharges
          : plans[currPlanId].yearlyCharges,
    };
    console.log("planbill", planBill);
    const samePlanAlreadyExistInBill = bill.some(
      (item) => item.id === currPlanId
    );
    if (samePlanAlreadyExistInBill) {
      return;
    } else {
      const newBillData = bill.filter((item) => item.type !== "plan"); //remove any prior plan
      incrementBill([...newBillData, planBill]);
    }
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
                plan.id === currentPlan &&
                bill.some((item) => item.id === plan.id)
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleClick(plan.id)}
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
      <br />
      {error && <p className="error">Please select atleast one plan.</p>}
      <div className={styles.durationToggler}>
        <span className={`${planDuration === "monthly" ? styles.active : ""}`}>
          Monthly
        </span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={planDuration !== "monthly"}
            onChange={handleToggle}
          />
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
