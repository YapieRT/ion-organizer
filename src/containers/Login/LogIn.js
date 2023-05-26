import styles from '../../css/LoginAndRegistration/RegistrationLogInBody.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogIn() {
  document.title = 'ION - Log In';
  const navigate = useNavigate();

  const [errormsg, setErrorMsg] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }
  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const postData = { email: enteredEmail, password: enteredPassword };

      for (let value of Object.values(postData)) {
        if (value === '') {
          setErrorMsg('You haven`t entered some data!');
          return;
        }
      }

      setErrorMsg('');

      await axios
        .post('http://localhost:8080/api/login', postData)
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

export default LogIn;
