import '../styles/components/LeftNavBar.css';
import namedLogo from "../assets/logo-name.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/AuthService';
import { removeUser } from '../utils/userSlice';

  const LeftNavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userData);

  const isLoggedIn = !!user;
  const userName = user?.firstName || "";
  const userMode = user?.role || "";
  const originalMode = user?.originalRole || "";

  const handleLogout = () => {
      logout(navigate, () => dispatch(removeUser()));
    };

  return (
    <div className='left-nav-container'>
        <button className="logo-container" onClick={() => navigate("/")}>
                <img src={namedLogo} alt="logo" className="logo" />
              </button>

        <div className="nav-links">
          <button className='nav-button' onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
        <button className='nav-button' onClick={() => navigate("/usermanage")}>
          User Management
        </button>
        </div>
        <div className="profile-div">
            <button onClick={() => navigate("/profile")} className="profile-link-button">
              <p className="username">{userName}</p>
            </button>
            <button onClick={handleLogout} className="profile-logout-button">
              Logout
            </button>
        </div>
        
        
    </div>
  )
}

export default LeftNavBar