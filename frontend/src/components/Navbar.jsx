import { NavLink, useNavigate } from "react-router-dom";
import "../styles/components/Navbar.css";
import namedLogo from "../assets/logo-name.png";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = true; // Replace with actual auth logic
  const userName = "Sajith"; // Replace with actual user name logic
  const userMode = "Admin"; // Replace with actual user mode logic

  return (
    <div className="navbar-container">
      {/* Logo button that navigates to home */}
      <button className="logo-container" onClick={() => navigate("/")}>
        <img src={namedLogo} alt="logo" className="logo" />
      </button>

      {/* Navigation links */}
      <div className="nav-links">
        <ul>
          <li>
            <NavLink to="/dashboard" className="navbar-link">API Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/manage" className="navbar-link">Manage Users</NavLink>
          </li>
        </ul>
      </div>

      {/* Current user controls */}
      <div className="current-user-button-container">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/register")}
              className="mode-link-button"
            >
              <p className="usermode">{userMode}</p>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="profile-link-button"
            >
              <p className="username">{userName}</p>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/register")}
              className="get-started-button"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="login-button"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
