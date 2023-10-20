import FormControl from "../ui/FormControl";
import FormGroup from "../ui/FormGroup";
import FormLabel from "../ui/FormLable";
import useForm from "../contexts/useForm";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?[0-9]{1,4}?\s?[0-9]{10}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};

function PersonalInfo() {
  const { nextStep } = useForm();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validate,
    onSubmit: () => {
      nextStep();
    },
  });

  // function handleNext() {
  //   formik.handleSubmit();
  //   nextStep();
  // }

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
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </FormGroup>
      <FormGroup>
        <FormLabel label="Email Address" />
        <FormControl
          name="email"
          placeholder="e.g. stephenking@lorem.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </FormGroup>
      <FormGroup>
        <FormLabel label="Name" />
        <FormControl
          placeholder="e.g. Stephen King"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="error">{formik.errors.phone}</div>
        ) : null}
      </FormGroup>
      {/* <FormGroup>
        <FormLabel label="Phone Number" />
        <FormControl
          name="phone"
          placeholder="e.g. +1 234 567 890"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="error">{formik.errors.phone}</div>
        ) : null}
      </FormGroup> */}
      <div className="actions">
        <a className="btn btn-next" onClick={formik.handleSubmit}>
          Next Step
        </a>
      </div>
    </>
  );
}

export default PersonalInfo;
