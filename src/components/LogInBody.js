import styles from '../css/RegistrationLogInBody.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LogInBody() {
  const navigate = useNavigate();

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
    const postData = { email: enteredEmail, password: enteredPassword };

    for (let value of Object.values(postData)) {
      if (value === '') {
        setErrorMsg('You haven`t entered some data!');
        return;
      }
    }

    setErrorMsg('');

    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth === true) {
          localStorage.setItem('token', data.token);
          setErrorMsg('');
          navigate('/storage', {});
        } else {
          setErrorMsg(data.message);
        }
      });
  }

  return (
    <div className={styles.container}>
      <b>Log In</b>
      <form onSubmit={submitHandler}>
        <div className={styles.formEmailLogIn}>
          <label>E-mail address:</label>
          <input id='userEmail' className={styles.registrationText} type='text' onChange={emailChangeHandler}></input>
        </div>
        <div className={styles.formPasswordLogIn}>
          <label>Password:</label>
          <input
            id='userPassword'
            className={styles.registrationText}
            type='password'
            onChange={passwordChangeHandler}
          ></input>
        </div>
        <button type='submit' className={styles.buttonLogIn}>
          Log In
        </button>
      </form>
      <p className={styles.errormsgLogin} onSubmit={submitHandler}>
        {errormsg}
      </p>
      <Link className={styles.register} to='/registration'>
        Register
      </Link>
    </div>
  );
}

export default LogInBody;
