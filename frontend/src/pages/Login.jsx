import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/pages/Login.css';
import { checkValidData } from '../utils/Validate';
import { useRef, useState } from 'react';
import { login } from '../utils/AuthService';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const handleLoginButtonClick = () => {
    // Validate the input data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return; // Stop if validation failed

    // Perform login
    login(
      email.current.value,
      password.current.value,
      navigate,
      setErrorMessage,
      (userData) => {
        dispatch(addUser(userData));
      }
    );
  };

  return (
    <div className='login-container'>
      <div className="login-info">
        Welcome to Bla Bla Bla. Please login to continue.
        <br />
        If you don't have an account, please sign up.
      </div>
      <div className="login-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="email-input">
            <input type="email" placeholder='Email address' ref={email} />
          </div>
          <div className="password-input">
            <input type="password" placeholder='Password' ref={password} />
          </div>
          <div className="error-message">
            <p className='error-text'>{errorMessage}</p>
          </div>
          <div className="process-options-container">
            <button
              type='button'
              className='sign-up-button'
              onClick={handleLoginButtonClick}
            >
              Log in
            </button>
            <NavLink to="/resetpassword">Forgotten password?</NavLink>
          </div>
          <hr />
          <div className="process-divert-options-container">
            <button
              type='button'
              onClick={() => navigate("/register")}
              className="create-new-account-button"
            >
              Create new account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
