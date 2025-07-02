import { Navigate, Outlet } from "react-router-dom";

const user = true; // Change to false to test redirect


const ProtectedRoute = () => {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export { ProtectedRoute, user };

