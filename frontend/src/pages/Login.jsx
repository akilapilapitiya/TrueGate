import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/pages/Login.css';
import {checkLogInValidateData} from '../utils/Validate'
import { useRef, useState } from 'react';

// Firebase 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";

const Login = () => {

  // State messages
  const [errorMessage, setErrorMessage] = useState(null)

  // Hook References for inputs
  const email = useRef(null);
  const password = useRef(null);

  // Login Button Logic
  const handleLogInClick = () => {
    // Validate Data
    const message = checkLogInValidateData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return; // If message stop operating foward

    //Login Logic  ################ Firebase
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/dashboard"); // Redirect to dashboard after login
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage)
      });

    
  }

  const navigate = useNavigate();

  return (
    <div className='login-container'>
      <div className="login-form">
        <form action="#" onSubmit={(e) => e.preventDefault()} className=''>

          <div className="email-input">
            <input type="email" placeholder='Email address' ref={email} />
          </div>
          <div className="password-input">
            <input type="password" placeholder='Password' ref={password}/>
          </div>
          <div className="error-message">
            <p className='error-message'>{errorMessage}</p>
          </div>
          <div className="process-options-container">
              <button className='log-in-button' onClick={handleLogInClick}>Log in</button>
              <NavLink to="/resetpassword" >Forgotten password?</NavLink>
          </div>
          <hr />
          <div className="process-divert-options-container">
            <button
              onClick={() => navigate("/register")}
              className="create-new-account-button"
            >
              Create new account
            </button>
          </div>


            
        </form>
      </div>
    </div>
  )
}

export default Login