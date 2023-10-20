import useForm from "../contexts/useForm";
import styles from "./PickAddons.module.css";

function PickAddons() {
  const {
    bill,
    calcTotalBill,
    addons,
    currentAddons: selectedAddons,
    setAddons: setSelectedAddons,
    planDuration,
    nextStep,
    prevStep,
    incrementBill,
    sortBillArray,
  } = useForm();

  function handleNext() {
    // Change the element order the plan should come before the addons bill
    sortBillArray();
    calcTotalBill();
    nextStep();
  }
  function handleClickAddon(addonId, currAddonIdx) {
    const idExists = selectedAddons.some((item) => item?.id === addonId);

    if (idExists) {
      const updatedAddons = selectedAddons.filter(
        (item) => item.id !== addonId
      );
      setSelectedAddons(updatedAddons);
    } else setSelectedAddons(addons.find((item) => item.id === addonId));

    const addonBill = {
      id: addonId,
      name: addons[currAddonIdx].name,
      type: "addon",
      duration: planDuration,
      monthlyCharges: addons[currAddonIdx].monthlyCharges,
      yearlyCharges: addons[currAddonIdx].yearlyCharges,
      charges:
        planDuration === "monthly"
          ? addons[currAddonIdx]?.monthlyCharges
          : addons[currAddonIdx]?.yearlyCharges,
    };
    const isAddonAlreadyExistInBill = bill.some((item) => item.id === addonId);
    if (isAddonAlreadyExistInBill) {
      incrementBill(bill.filter((item) => item.id !== addonId));
      return;
    } else incrementBill(addonBill);
  }

  return (
    <>
      <h3 className="header">Pick add-ons</h3>
      <p className="para">Add-ons help enhance your gaming experience.</p>
      <div className={styles.addonsWrapper}>
        {addons.map((addon, idx) => {
          return (
            <a
              key={addon.id}
              className={`${styles.addon} ${
                selectedAddons.some((item) => item?.id === addon?.id)
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleClickAddon(addon?.id, idx)}
            >
              <span
                className={`${styles.checkbox} ${
                  selectedAddons.some((item) => item?.id === addon?.id)
                    ? styles.checked
                    : ""
                }`}
              ></span>
              {/* <label htmlFor={addon?.id}>
                <input
                  id={addon?.id}
                  className={styles.checkbox}
                  type="checkbox"
                  checked={selectedAddons.some(
                    (item) => item?.id === addon?.id
                  )}
                  onChange={() => {}}
                />
                <span></span>
              </label> */}
              <h1>{addon.id}</h1>
              <div>
                <h6>{addon.name}</h6>
                <p>{addon.description}</p>
              </div>
              {planDuration === "monthly" && (
                <span>+${addon.monthlyCharges}/mo</span>
              )}
              {planDuration === "yearly" && (
                <span>+${addon.yearlyCharges}/yr</span>
              )}
            </a>
          );
        })}
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

export default PickAddons;
