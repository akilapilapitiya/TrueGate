import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import '../styles/layout/RootLayout.css';
import AuthListener from '../utils/AuthListener';


const RootLayout = () => {
  return (
    <div>
      <AuthListener /> {/* Handles login/logout sync */}
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main-body">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
