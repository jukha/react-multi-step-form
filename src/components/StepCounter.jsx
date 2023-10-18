import styles from "./StepCounter.module.css";

function StepCounter({ stepNo, name, isActive, onClick }) {
  return (
    <li>
      <button className={styles.stepBtn} onClick={() => onClick(stepNo)}>
        <span className={`${styles.stepNo} ${isActive ? styles.active : ""}`}>
          {stepNo}
        </span>
        <a>
          <span>step {stepNo}</span>
          <span> {name}</span>
        </a>
      </button>
    </li>
  );
}

export default StepCounter;
