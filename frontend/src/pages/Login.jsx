import { NavLink, useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";
import { checkLogInValidateData } from "../utils/Validate";
import { useRef, useState } from "react";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import Loading from "../components/Loading"; // make sure you have this component!
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice"; // Redux action to add user data

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State messages
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // loading state for login process

  // Hook References for inputs
  const email = useRef(null);
  const password = useRef(null);

  // Login Button Logic
  const handleLogInClick = async () => {
    setErrorMessage(null); // reset error
    setLoading(true); // show loading spinner

    // Validate Data
    const message = checkLogInValidateData(
      email.current.value,
      password.current.value
    );
    if (message) {
      setErrorMessage(message);
      setLoading(false);
      return; // stop here if validation fails
    }

    // Login Logic with Firebase
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      // Update Redux
      dispatch(
        addUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );

      setLoading(false);
      navigate("/profile"); // Redirect to profile after login
    } catch (error) {
      setErrorMessage(error.code + " - " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="login-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogInClick();
            }}
          >
            <div className="email-input">
              <input type="email" placeholder="Email address" ref={email} />
            </div>
            <div className="password-input">
              <input type="password" placeholder="Password" ref={password} />
            </div>
            <div className="error-message">
              <p className="error-message">{errorMessage}</p>
            </div>
            <div className="process-options-container">
              <button type="submit" className="log-in-button">
                Log in
              </button>
              <NavLink to="/resetpassword">Forgotten password?</NavLink>
            </div>
            <hr />
            <div className="process-divert-options-container">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="create-new-account-button"
              >
                Create new account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
