import React from 'react'
import { NavLink } from 'react-router-dom'

const Profile = () => {
  return (
    <div>
        <NavLink to="/login">Login</NavLink><br />
        <NavLink to="/register">Register</NavLink><br />
        <NavLink to="/profile">Profile</NavLink><br />
        <NavLink to="/community">Community</NavLink><br />
        <NavLink to="/password-reset">Password Reset</NavLink><br />
        <NavLink to="/devices">Devices</NavLink><br />
        <NavLink to="/dashboard">Dashboard</NavLink><br />
        <NavLink to="/users">Users</NavLink><br />
        <NavLink to="/not-found">Not Found</NavLink><br />
        <NavLink to="/">Home</NavLink><br />
    </div>
  )
}

export default Profile