import { use, useRef, useState } from 'react';
import '../styles/pages/PasswordReset.css';
import { useSelector } from 'react-redux';
import { newPasswordValidateData } from '../utils/Validate';
import { updatePassword } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/modals/SuccessModal';


const PasswordReset = () => {

  const store = useSelector((state) => state.user);
  const [changeEligible, setChangeEligible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);



  const navigate = useNavigate();

  const email = useRef(null);
  const contact = useRef(null);
  const newPassword = useRef(null);
  const reNewPassword = useRef(null);

  const validateEmailInput = () => {
    // External User Request
    if(!store){}
    // Loged In User Request
    else{
      if(email.current.value !== store.email) return;
      else{
        setChangeEligible(true);      
      }
    }
  }

  const handleUpdatePassword = () => {
  const message = newPasswordValidateData(newPassword.current.value, reNewPassword.current.value);
  setErrorMessage(message);
  if (message) return;

  const user = auth.currentUser;

  if (!user) {
    setErrorMessage("You must be logged in to change your password.");
    return;
  }

  updatePassword(user, newPassword.current.value)
    .then(() => {
      console.log("Password updated successfully");
      setChangeEligible(false);
      setShowSuccessModal(true);
    })
    .catch((error) => {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        setErrorMessage("You need to re-login before changing your password.");
      } else {
        setErrorMessage("Failed to update password: " + error.message);
      }
    });
};


  
  return (
    <div className='password-reset-container'>
      <h2>Please Follow the Steps to Reset Your password</h2>
      {store ? (
        <div className="input-box">
        <p>Enter your email address below.</p>
        <input type="email" placeholder='Email address' ref={email} />
        <button className='check-email-button' onClick={validateEmailInput}>Confirm Email</button>
      </div>
      ) : (
        <div className="input-box">
        <p>Enter your email address and Contact Number below.</p>
        <input type="email" placeholder='Email address' ref={email} />
        <input type="text" placeholder='Contact Number' ref={contact} />
        <button className='check-email-button' onClick={validateEmailInput}>Confirm Identity</button>
      </div>
      )}

      {changeEligible && (
        <div className="password-add-box">
          <p>Please Enter Your New Password</p>
          <input type="text" placeholder='New Password' ref={newPassword}/>
          <input type="text" placeholder='Re-Enter New Password' ref={reNewPassword}/>
          <button className='reset-password-button' onClick={handleUpdatePassword}>Reset Password</button>
        </div>

      )}
      {showSuccessModal && (
  <SuccessModal 
          message="Your password has been updated successfully!" 
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/profile"); // optional navigation after close
          }} 
        />
      )}

      <div className="error-message">
            <p className='error-message'>{errorMessage}</p>
            </div>
    </div>
    
  )
}

export default PasswordReset