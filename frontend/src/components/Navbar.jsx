import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/components/Navbar.css";
import namedLogo from "../assets/logo-name.png";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setUserRole } from "../utils/userSlice";
import { logout } from "../utils/AuthService";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user.userData);

  const isLoggedIn = !!user;
  const userName = user?.firstName || "";
  const userMode = user?.role || "";
  const originalMode = user?.originalRole || "";

  const handleLogout = () => {
    logout(navigate, () => dispatch(removeUser()));
  };

  const handleModeToggle = () => {
    if (originalMode !== "admin") return; // prevent clients from switching
    const newRole = userMode === "admin" ? "client" : "admin";
    dispatch(setUserRole(newRole));
  };

  return (
    <div className="navbar-container">
      <button className="logo-container" onClick={() => navigate("/")}>
        <img src={namedLogo} alt="logo" className="logo" />
      </button>

      <div className="nav-links">
        <ul>
          {userMode === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard" className="navbar-link">API Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/manage" className="navbar-link">Manage Users</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="current-user-button-container">
        {isLoggedIn ? (
          <>
            {originalMode === "admin" && (
              <button onClick={handleModeToggle} className="mode-link-button">
                <p className="usermode">{userMode}</p>
              </button>
            )}
            <button onClick={() => navigate("/profile")} className="profile-link-button">
              <p className="username">{userName}</p>
            </button>
            <button onClick={handleLogout} className="profile-logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/register" && (
              <button onClick={() => navigate("/register")} className="get-started-button">
                Get Started
              </button>
            )}

            {location.pathname !== "/login" && (
              <button onClick={() => navigate("/login")} className="login-button">
                Login
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
