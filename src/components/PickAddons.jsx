import { useState } from "react";
import useForm from "../contexts/useForm";
import styles from "./PickAddons.module.css";

const addons = [
  {
    id: 0,
    name: "Online service",
    description: "Access to multiplayer games",
    charges: 1,
  },
  {
    id: 1,
    name: "Local storage",
    description: "Extra 1TB of cloud service",
    charges: 2,
  },
  {
    id: 2,
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    charges: 2,
  },
];

function PickAddons() {
  const { nextStep, prevStep, incrementBill } = useForm();
  const [selectedAddons, setSelectedAddons] = useState([]);
  function handleNext() {
    let newBills = [];

    if (selectedAddons.length > 0) {
      newBills = selectedAddons.map((selectedId) => {
        const addon = addons.find((addon) => addon.id === selectedId);

        return {
          name: addon.name,
          type: "addon",
          duration: null, // You may want to set an appropriate value here
          charges: addon.charges,
        };
      });
    }
    incrementBill(newBills);
    nextStep();
  }
  function handleClickAddon(id) {
    setSelectedAddons((addons) => {
      if (addons.includes(id)) {
        return addons.filter((item) => item !== id);
      } else {
        return [...addons, id];
      }
    });
  }

  return (
    <>
      <h3 className="header">Pick add-ons</h3>
      <p className="para">Add-ons help enhance your gaming experience.</p>
      <div className={styles.addonsWrapper}>
        {addons.map((addon) => {
          return (
            <a
              key={addon.id}
              className={`${styles.addon} ${
                selectedAddons?.includes(addon.id) ? styles.active : ""
              }`}
              onClick={() => handleClickAddon(addon.id)}
            >
              <label htmlFor={addon.id}>
                <input
                  id={addon.id}
                  className={styles.checkbox}
                  type="checkbox"
                  checked={selectedAddons?.includes(addon.id)}
                  onChange={() => handleClickAddon(addon.id)}
                />
                <span></span>
              </label>
              <div>
                <h6>{addon.name}</h6>
                <p>{addon.description}</p>
              </div>
              <span>+${addon.charges}/mo</span>
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
