import styles from '../../css/LoginAndRegistration/RegistrationLogInBody.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegistrationBody() {
  const navigate = useNavigate();

  let [errormsg, setErrorMsg] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredOrganization, setEnteredOrganization] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  function nameChangeHandler(event) {
    setEnteredName(event.target.value);
  }
  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }
  function organizationChangeHandler(event) {
    setEnteredOrganization(event.target.value);
  }
  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      name: enteredName,
      email: enteredEmail,
      organization: enteredOrganization,
      password: enteredPassword,
    };

    for (let value of Object.values(postData)) {
      if (value === '') {
        setErrorMsg('You haven`t entered some data!');
        return;
      }
    }

    setErrorMsg('');

    fetch('http://localhost:8080/registration', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Authorization',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
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
      <b>Registration</b>
      <form onSubmit={submitHandler}>
        <div className={styles.formNameRegistration}>
          <label>Enter your name:</label>
          <input id='userName' className={styles.registrationText} type='text' onChange={nameChangeHandler}></input>
        </div>
        <div className={styles.formEmailRegistration}>
          <label>Enter your e-mail address:</label>
          <input id='userEmail' className={styles.registrationText} type='text' onChange={emailChangeHandler}></input>
        </div>
        <div className={styles.formOrganizationRegistration}>
          <label>Enter your organization name:</label>
          <input
            id='userOrganizationName'
            className={styles.registrationText}
            type='text'
            onChange={organizationChangeHandler}
          ></input>
        </div>
        <div className={styles.formPasswordRegistration}>
          <label>Enter your password:</label>
          <input
            id='userPassword'
            className={styles.registrationText}
            type='password'
            onChange={passwordChangeHandler}
          ></input>
        </div>
        <button type='submit' className={styles.buttonRegister}>
          Register
        </button>
      </form>
      <p className={styles.errormsgRegistration} onSubmit={submitHandler}>
        {errormsg}
      </p>
      <Link className={styles.login} to='/login'>
        Log In
      </Link>
    </div>
  );
}

export default RegistrationBody;
