import { NavLink, useNavigate } from "react-router-dom";
import { checkSignUpValidateData } from "../utils/Validate";
import { useRef, useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../utils/Firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  // Error State messages
  const [errorMessage, setErrorMessage] = useState(null);

  // Hook References for inputs
  const email = useRef(null);
  const firstName = useRef(null);
  const surName = useRef(null);
  const dob = useRef(null);
  const contact = useRef(null);
  const password = useRef(null);
  const rePassword = useRef(null);
  const genderMale = useRef(null);
  const genderFemale = useRef(null);
  const modeAdmin = useRef(null);
  const modeClient = useRef(null);

  const handleSignUpClick = () => {
    // Get gender and mode
    const gender = genderMale.current.checked
      ? "male"
      : genderFemale.current.checked
      ? "female"
      : null;

    const mode = modeAdmin.current.checked
      ? "admin"
      : modeClient.current.checked
      ? "client"
      : null;

    const dobDate = dob.current.value ? new Date(dob.current.value) : null;

    // Validate inputs
    const message = checkSignUpValidateData(
      email.current.value,
      password.current.value,
      rePassword.current.value,
      firstName.current.value,
      surName.current.value,
      dob.current.value,
      contact.current.value
    );
    setErrorMessage(message);

    if (message) return; // Stop if validation error

    // Sign Up Logic
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;

        // Update profile
        updateProfile(user, {
          displayName: firstName.current.value,
          phoneNumber: contact.current.value,
        })
          .then(() => {
            setDoc(doc(db, "users", user.uid), {
              firstName: firstName.current.value,
              surName: surName.current.value,
              dob: dobDate ? dobDate.toISOString() : null,
              gender: gender,
              mode: mode,
              contact: contact.current.value,
              email: email.current.value,
            })
              .then(() => {
                navigate("/dashboard"); // Redirect after Firestore doc creation
              })
              .catch((error) => {
                setErrorMessage("Failed to save user data: " + error.message);
              });
          })
          .catch((error) => {
            setErrorMessage("Profile update failed: " + error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.code + " - " + error.message);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="register-container">
      <div className="register-form">
        <form action="#" className="" onSubmit={(e) => e.preventDefault()}>
          <div className="header-box">
            <h1 className="header">Create a new account</h1>
          </div>
          <hr />
          <div className="username-input">
            <input type="text" placeholder="First name" ref={firstName} />
            <input type="text" placeholder="Surname" ref={surName} />
          </div>
          <div className="email-input">
            <input type="email" placeholder="Email address" ref={email} />
          </div>
          <div className="dob-input">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob" id="dob" ref={dob} />
          </div>
          <div className="contact-input">
            <label htmlFor="mobile-number">Contact Number</label>
            <input
              type="tel"
              name="mobile-number"
              id="mobile-number"
              placeholder="Mobile Number"
              ref={contact}
            />
          </div>
          <div className="gender-input">
            <label htmlFor="gender">Gender</label>
            <div className="gender-instances">
              <div className="gender-button">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  ref={genderMale}
                  defaultChecked
                />{" "}
                Male
              </div>
              <div className="gender-button">
                <input
                  type="radio"
                  name="gender"
                  ref={genderFemale}
                  value="female"
                />{" "}
                Female
              </div>
            </div>
          </div>
          <div className="mode-input">
            <label htmlFor="mode">User Mode</label>
            <div className="mode-instances">
              <div className="mode-button">
                <input type="radio" name="mode" value="admin" ref={modeAdmin} />{" "}
                Administrator
              </div>
              <div className="mode-button">
                <input
                  type="radio"
                  name="mode"
                  value="client"
                  ref={modeClient}
                  defaultChecked
                />{" "}
                Client
              </div>
            </div>
          </div>
          <div className="password-input">
            <input type="password" placeholder="Password" ref={password} />
            <input
              type="password"
              placeholder="Re-Enter Password"
              ref={rePassword}
            />
          </div>
          <div className="error-message">
            <p className="error-message">{errorMessage}</p>
          </div>
          <div className="process-options-container">
            <button className="sign-up-button" onClick={handleSignUpClick}>
              Sign Up
            </button>
            <NavLink to="/login">Already have an Account?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
