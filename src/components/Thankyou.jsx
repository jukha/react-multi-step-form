import img from "./../../public/icon-thank-you.svg";
import styles from "./Thankyou.module.css";
function Thankyou() {
  return (
    <div className={styles.thankYouWrapper}>
      <div className={styles.thanksImg}>
        <img src={img} />
      </div>
      <h3 className="header">Thank you!</h3>
      <p className="para">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

export default Thankyou;
