

function FormControl({ placeholder, value, onChange, checkForError }) {
  return (
    <>
      <input
        className="form-control"
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
      />
      {checkForError && !value && <span className="error">Required.</span>}
    </>
  );
}

export default FormControl;
