import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import '../styles/layout/RootLayout.css'

const RootLayout = () => {
  return (
    <div>
        <div className="navbar">
            <Navbar />
        </div>
        <div className="main-body">
            <Outlet />
        </div>
    </div>
  )
}

export default RootLayout