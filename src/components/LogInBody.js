import styles from '../css/RegistrationLogInBody.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LogInBody() {
  let [errormsg, setErrorMsg] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }
  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = { userEmail: enteredEmail, userPassword: enteredPassword };

    for (let value of Object.values(postData)) {
      if (value === '') {
        setErrorMsg('You entered wrong data!');
        return;
      }
    }

    setErrorMsg('');
  }

  return (
    <div className={styles.container}>
      <b>Log In</b>
      <form onSubmit={submitHandler}>
        <div className={styles.formEmailLogIn}>
          <label>E-mail address:</label>
          <input id="userEmail" className={styles.registrationText} type="text" onChange={emailChangeHandler}></input>
        </div>
        <div className={styles.formPasswordLogIn}>
          <label>Password:</label>
          <input id="userPassword" className={styles.registrationText} type="password" onChange={passwordChangeHandler}></input>
        </div>
        <button type="submit" className={styles.buttonLogIn}>
          Log In
        </button>
      </form>
      <p className={styles.errormsgLogin} onSubmit={submitHandler}>
        {errormsg}
      </p>
      <Link className={styles.register} to="/registration">
        Register
      </Link>
    </div>
  );
}

export default LogInBody;
