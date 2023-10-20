import useForm from "../contexts/useForm";
import styles from "./FinishUp.module.css";

function FinishUp() {
  const { bill, prevStep, nextStep } = useForm();
  return (
    <>
      <h3 className="header">Finishing up</h3>
      <p className="para">
        Double-check everything looks OK before confirming.
      </p>
      <table className={styles.table}>
        <tbody>
          {bill.map((item) => {
            return (
              <tr key={`${item?.name}${Date.now()}`}>
                <td>
                  <div>
                    {item?.name}
                    {item?.type === "plan" && <span>({item?.duration})</span>}
                    <br />
                    {item?.type === "plan" && (
                      <a className={styles.changePlanBtn}>change</a>
                    )}
                  </div>
                </td>
                <td className={styles.textRight}>${item?.charges}/yr</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.total}>
        <span>Total()</span>
        <h6>+$12/mo</h6>
      </div>
      <div className="actions">
        <a className="btn btn-back" onClick={prevStep}>
          Go Back
        </a>
        <a className="btn btn-next" onClick={nextStep}>
          Next Step
        </a>
      </div>
    </>
  );
}

export default FinishUp;
