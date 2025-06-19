import React from 'react'
import '../styles/components/Navbar.css' 
import logo from '../assets/logo-name.png'  
import { NavLink, useNavigate } from 'react-router-dom'



const Navbar = () => {

    const navigate = useNavigate();
  return (
    <div>
        <div className="container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="link-container"></div>
                <ul>
                    <NavLink to='/'><li>Home</li></NavLink>
                    <NavLink to='/support'><li>Support</li></NavLink>
                    <NavLink to='/contact'><li>Contact</li></NavLink>
                </ul>
            <div className="user-container">
                {/* Button for login, replaces the histroy recorded */}
                <button onClick={() => navigate('/login', {replace:true})}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar