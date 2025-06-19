import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

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