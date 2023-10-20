function FormControl({ name, placeholder, value, onChange, onBlur }) {
  return (
    <>
      <input
        className="form-control"
        name={name}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
}

export default FormControl;
