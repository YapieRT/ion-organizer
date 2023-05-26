import styles from '../../css/LoginAndRegistration/RegistrationLogInBody.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
  document.title = 'ION - Registration';
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

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
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

      await axios('http://localhost:8080/api/registration', postData)
        .then((response) => {
          if (response.data.auth === true) {
            localStorage.setItem('token', response.data.token);
            setErrorMsg('');
            navigate('/storage', {});
          } else {
            setErrorMsg(response.data.message);
          }
        })
        .catch((error) => {
          setErrorMsg(error.response.data.message);
        });
    } catch (err) {}
  };

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

export default Registration;
