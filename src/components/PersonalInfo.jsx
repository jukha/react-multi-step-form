import FormControl from "../ui/FormControl";
import FormGroup from "../ui/FormGroup";
import FormLabel from "../ui/FormLable";

function PersonalInfo() {
  return (
    <>
      <h3 className="header">Personal Info</h3>
      <p className="para">
        Please provide your name, email address, and phone number.
      </p>
      <FormGroup>
        <FormLabel label="Name" />
        <FormControl placeholder="e.g. Stephen King" />
      </FormGroup>
      <FormGroup>
        <FormLabel label="Email Address" />
        <FormControl placeholder="e.g. stephenking@lorem.com" />
      </FormGroup>
      <FormGroup>
        <FormLabel label="Phone Number" />
        <FormControl placeholder="e.g. +1 234 567 890" />
      </FormGroup>
      <div className="actions">
        <a className="btn-back">Go Back</a>
        <a className="btn btn-next">Next Step</a>
      </div>
    </>
  );
}

export default PersonalInfo;
