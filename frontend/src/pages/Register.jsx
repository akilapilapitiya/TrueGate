import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/pages/Register.css';
import { checkInputData, checkValidData } from '../utils/Validate';
import { use, useRef, useState } from 'react';

const Register = () => {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const firstName = useRef(null);
  const surName = useRef(null);
  const day = useRef(null);
  const month = useRef(null);
  const year = useRef(null);
  const genderFemale = useRef(null);
  const genderMale = useRef(null);
  const password = useRef(null);
  const rePassword = useRef(null);

  const handleSignInButtonClick =() =>{
  //Validate if gender is selected  
  let selectedGender = null;
  if (genderMale.current.checked) selectedGender = genderMale.current.value;
  if (genderFemale.current.checked) selectedGender = genderFemale.current.value;

  // Validate all inputs
  const message = checkInputData(firstName.current.value, surName.current.value, day.current.value,  month.current.value, year.current.value, selectedGender, password.current.value, rePassword.current.value)
  setErrorMessage(message);
  }

  return (
    <div className='register-container'>
      <div className="register-info">Welcome to Bla Bla Bla Only Admins can Add Another Admin</div>
      <div className="register-form">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div className="header-box">
            <h1 className='header'>Create a new account</h1>
          </div>
          <hr />
          <div className="username-input">
            <input type="text" placeholder='First name' ref={firstName}/>
            <input type="text" placeholder='Surname' ref={surName}/>
          </div>
          <div className="dob-input">
            <label htmlFor="dob">Date of Birth</label>
            <div className="date-fields">
            <input type="number" name="day" placeholder="DD" maxlength="2" size="2" min="1" max="31" ref={day}/>
            <input type="number" name="month" placeholder="MM" maxlength="2" size="2" min="1" max="12" ref={month}/>
            <input type="number" name="year" placeholder="YYYY" maxlength="4" size="4" min="1900" max="2099" ref={year}/>
            </div>   
          </div>
          <div className="gender-input">
            <label htmlFor="gender">Gender</label>
            <div className="gender-instances">
              <div className="gender-button">
              <input type="radio" name='gender' value='male' ref={genderMale} defaultChecked/>  Male
            </div>
            <div className="gender-button">
              <input type="radio" name='gender' value='female' ref={genderFemale}/>  Female
            </div>
          </div>
            
          </div>
            <div className="password-input">
              <input type="password" placeholder='Password' ref={password}/>
              <input type="password" placeholder='Re-Enter Password' ref={rePassword}/>   
            </div>
              <div className="error-message">
              <p className='error-text'>{errorMessage}</p>
            </div>
            <div className="process-options-container">
              <button className='sign-up-button' onClick={handleSignInButtonClick}>Sign Up</button>
              <NavLink to="/login" >Already have an Account?</NavLink>
            </div>
            
            
          
        </form>
      </div>
    </div>
  )
}

export default Register