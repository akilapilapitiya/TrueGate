import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/components/Navbar.css";
import namedLogo from "../assets/logo-name.png";
import { auth } from "../utils/Firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login"); // Redirect to login after sign out
    })
    .catch((error) => {
      navigate("/error"); // navigate to an error page
    });
  }

  return (
    <div className="navbar-container">
      {/* Logo button that navigates to home */}
      <button className="logo-container" onClick={() => navigate("/")}>
        <img src={namedLogo} alt="logo" className="logo" />
      </button>
   
      {user ? (
      <>
        {user.mode === "admin" && (
          <div className="nav-links">
            <ul>
              <li>
                <NavLink to="/dashboard" className="navbar-link">
                  API Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/manage" className="navbar-link">
                  Manage Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        
        <div className="current-user-button-container">
          {location.pathname !== "/profile" && (
            <button
            onClick={() => navigate("/profile")}
            className="profile-link-button">
            <p className="username">{user.firstName}</p>
          </button>
          )}
          
          <button onClick={handleSignOut} className="logout-button">
            Logout
          </button>
        </div>
      </>
    ) : (
      <div className="current-user-button-container">
        {location.pathname !== "/register" && (
          <button
          onClick={() => navigate("/register")}
          className="get-started-button"
        >
          Get Started
        </button>
        )}
        
        {location.pathname !== "/login" && (
          <button
          onClick={() => navigate("/login")}
          className="login-button"
        >
          Login
        </button>
        )}
        
      </div>
    )}


      
    </div>
  );
};

export default Navbar;
