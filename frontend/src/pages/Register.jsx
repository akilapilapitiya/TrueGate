import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/pages/Register.css';

const Register = () => {

  const navigate = useNavigate();
  return (
    <div className='register-container'>
      <div className="register-form">
        <form action="#" className=''>
          <div className="header-box">
            <h1 className='header'>Create a new account</h1>
          </div>
          <hr />
          <div className="username-input">
            <input type="text" placeholder='First name'/>
            <input type="text" placeholder='Surname' />
          </div>
          <div className="dob-input">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name='dob' id='dob' />   
          </div>
          <div className="contact-input">
            <label htmlFor="mobile-number">Contact Number</label>
            <input type="tel" name='mobile-number' id='mobile-number' placeholder='Mobile Number' />
          </div>
          <div className="gender-input">
            <label htmlFor="gender">Gender</label>
            <div className="gender-instances">
              <div className="gender-button">
              <input type="radio" name='gender' value='male'/>  Male
            </div>
            <div className="gender-button">
              <input type="radio" name='gender' value='female'/>  Female
            </div>
          </div> 
          </div>
          <div className="mode-input">
            <label htmlFor="mode">User Mode</label>
            <div className="mode-instances">
              <div className="mode-button">
              <input type="radio" name='mode' value='admin'/> Administrator
            </div>
            <div className="mode-button">
              <input type="radio" name='mode' value='client'/>  Client
            </div>
          </div> 
          </div>
            <div className="password-input">
              <input type="password" placeholder='Password'/>
              <input type="password" placeholder='Re-Enter Password'/>   
            </div>
            <div className="process-options-container">
              <button className='sign-up-button' onClick={() => navigate("/profile")}>Sign Up</button>
              <NavLink to="/login" >Already have an Account?</NavLink>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register