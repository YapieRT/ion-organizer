import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/LoginAndRegistration/RegistrationLogInBody.module.scss';
import axios from 'axios';

function LogIn() {
  document.title = 'ION - Log In';
  const navigate = useNavigate();

  const ip = process.env.REACT_APP_BACKEND_IP ? process.env.REACT_APP_BACKEND_IP : process.env.REACT_APP_DEFAULT_IP;

  const [errormsg, setErrorMsg] = useState('');

  const [userInfo, setUserInfo] = useState({
    name: '',
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
      const postData = { email: userInfo.email, password: userInfo.password };

      setErrorMsg('');

      await axios
        .post(`${ip}/api/login`, postData)
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
      <b>Log In</b>
      <form onSubmit={submitHandler}>
        <div className={styles.formEmailLogIn}>
          <label>E-mail address:</label>
          <input
            id='userEmail'
            className={styles.registrationText}
            name='email'
            type='text'
            onChange={userInfoHandler}
          ></input>
        </div>
        <div className={styles.formPasswordLogIn}>
          <label>Password:</label>
          <input
            id='userPassword'
            className={styles.registrationText}
            name='password'
            type='password'
            onChange={userInfoHandler}
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
