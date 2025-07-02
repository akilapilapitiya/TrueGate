import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = ({ user, admin }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!admin) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export { ProtectedRoute, AdminRoute };
