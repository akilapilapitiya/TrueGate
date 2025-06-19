import React from 'react'
import '../styles/components/Navbar.css' 
import logo from '../assets/logo-name.png'   

const Navbar = () => {
  return (
    <div>
        <div className="container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="link-container"></div>
            <div className="user-container"></div>
        </div>
    </div>
  )
}

export default Navbar