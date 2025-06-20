import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/pages/Login.css';

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className='login-container'>
      <div className="login-info">
        Welcome to Bla Bla Bla. Please login to continue.
        <br />
        If you don't have an account, please sign up.
      </div>
      <div className="login-form">
        <form action="#" className=''>

          <div className="email-input">
            <input type="email" placeholder='Email address' />
          </div>
          <div className="password-input">
            <input type="password" placeholder='Password' />
          </div>
          <div className="process-options-container">
              <button className='sign-up-button' onClick={() => navigate("/profile")}>Log in</button>
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