import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/pages/Register.css';

const Register = () => {

  const navigate = useNavigate();
  return (
    <div className='register-container'>
      <div className="register-info">Welcome to Bla Bla Bla Only Admins can Add Another Admin</div>
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
            <div className="date-fields">
            <input type="number" name="date" placeholder="DD" maxlength="2" size="2" min="1" max="31"/>
            <input type="number" name="month" placeholder="MM" maxlength="2" size="2" min="1" max="12" />
            <input type="number" name="year" placeholder="YYYY" maxlength="4" size="4" min="1900" max="2025"/>
            </div>   
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