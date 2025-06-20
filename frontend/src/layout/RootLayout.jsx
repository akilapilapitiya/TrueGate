import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import '../styles/layout/RootLayout.css'
import LeftNavBar from '../components/LeftNavBar';

const RootLayout = () => {

  const location = useLocation();
  return (
    <div>
  {location.pathname == "/dashboard" || location.pathname == "/usermanage" ? (
    <div className='column-body'>
      <div className="left-navbar">
      <LeftNavBar />  
    </div>
    <div className="dashboard-main-body">
    <Outlet />
  </div></div>
  ) : (
    <div className='row-body'>
      <div className="navbar">
      <Navbar />
    </div>
    <div className="main-body">
    <Outlet />
  </div></div>
  )}

  
</div>
  )
}

export default RootLayout