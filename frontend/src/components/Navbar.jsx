import { NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <div className="navbar">
        <div className="logo-container"></div>
        <div className="nav-links">
            <ul>
                <NavLink to='/dashboard'><li>API Dashboard</li></NavLink>
                <NavLink to= '/manage'><li>Manage Users</li></NavLink>

            </ul>
        </div>
        <div className="current-user">
            <button onClick={() => navigate('/register')}>Get Started</button>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
        
    </div>
  )
}

export default Navbar