import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/LoginAndRegistration/RegistrationLogInBody.module.scss';
import axios from 'axios';

function Registration() {
  document.title = 'ION - Registration';
  const navigate = useNavigate();

  const ip = process.env.REACT_APP_BACKEND_IP
    ? process.env.REACT_APP_BACKEND_IP
    : (REACT_APP_DEFAULT_IP = 'http://localhost:8080');

  let [errormsg, setErrorMsg] = useState('');

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    organization: '',
    password: '',
  });

  const userInfoHandler = (event) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const postData = {
        name: userInfo.name,
        email: userInfo.email,
        organization: userInfo.organization,
        password: userInfo.password,
      };

      setErrorMsg('');

      await axios
        .post(`${ip}/api/registration`, postData)
        .then((response) => {
          if (response.data.auth === true) {
            localStorage.setItem('token', response.data.token);
            setErrorMsg('');
            navigate('/storage', {});
          }
        })
        .catch((error) => {
          if (error.response.data.errors && error.response.data.errors.length > 0) {
            setErrorMsg(error.response.data.errors[0].msg);
          } else if (error.response.data.message) {
            setErrorMsg(error.response.data.message);
          } else {
            setErrorMsg('An error occurred.');
          }
        });
    } catch (err) {}
  };

  return (
    <div className={styles.container}>
      <b>Registration</b>
      <form onSubmit={submitHandler}>
        <div className={styles.formNameRegistration}>
          <label>Enter your name:</label>
          <input
            id='userName'
            className={styles.registrationText}
            name='name'
            type='text'
            onChange={userInfoHandler}
          ></input>
        </div>
        <div className={styles.formEmailRegistration}>
          <label>Enter your e-mail address:</label>
          <input
            id='userEmail'
            className={styles.registrationText}
            name='email'
            type='text'
            onChange={userInfoHandler}
          ></input>
        </div>
        <div className={styles.formOrganizationRegistration}>
          <label>Enter your organization name:</label>
          <input
            id='userOrganizationName'
            className={styles.registrationText}
            name='organization'
            type='text'
            onChange={userInfoHandler}
          ></input>
        </div>
        <div className={styles.formPasswordRegistration}>
          <label>Enter your password:</label>
          <input
            id='userPassword'
            className={styles.registrationText}
            name='password'
            type='password'
            onChange={userInfoHandler}
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
