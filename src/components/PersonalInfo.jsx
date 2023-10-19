import { useState } from "react";
// import useForm from "../contexts/useForm";
import FormControl from "../ui/FormControl";
import FormGroup from "../ui/FormGroup";
import FormLabel from "../ui/FormLable";
import useForm from "../contexts/useForm";

function PersonalInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkForError, setCheckForError] = useState(false);

  const { nextStep, removeError, setError } = useForm();

  function handleNameChange(e) {
    setName(e.target.value);
    setCheckForError(false);
    if (!name) setError();
    removeError();
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
    setCheckForError(false);
    if (!email) setError();
    removeError();
  }
  function handlePhoneChange(e) {
    setPhone(e.target.value);
    setCheckForError(false);
    if (!phone) setError();
    removeError();
  }

  function handleNext() {
    setCheckForError(true);
    if (!name || !email || !phone) setError();
    nextStep();
  }

  return (
    <>
      <h3 className="header">Personal Info</h3>
      <p className="para">
        Please provide your name, email address, and phone number.
      </p>
      <FormGroup>
        <FormLabel label="Name" />
        <FormControl
          placeholder="e.g. Stephen King"
          value={name}
          onChange={handleNameChange}
          checkForError={checkForError}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel label="Email Address" />
        <FormControl
          placeholder="e.g. stephenking@lorem.com"
          value={email}
          onChange={handleEmailChange}
          checkForError={checkForError}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel label="Phone Number" />
        <FormControl
          placeholder="e.g. +1 234 567 890"
          value={phone}
          onChange={handlePhoneChange}
          checkForError={checkForError}
        />
      </FormGroup>
      <div className="actions">
        <a className="btn btn-next" onClick={handleNext}>
          Next Step
        </a>
      </div>
    </>
  );
}

export default PersonalInfo;
