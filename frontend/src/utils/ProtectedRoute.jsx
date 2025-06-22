import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * @param {ReactNode} children - the component to render
 * @param {boolean} requireAdmin - if true, checks if user is admin
 */

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const user = useSelector((state) => state.user); 
    // Check if user is logged in
    if (!user) {
        return <Navigate to="/" replace />; //Not logged in, redirect to home
    }

    // Check if admin access is required
    if (requireAdmin && user.mode !== "admin") {
        return null
    }
  return children; // Allow access
}

export default ProtectedRoute;