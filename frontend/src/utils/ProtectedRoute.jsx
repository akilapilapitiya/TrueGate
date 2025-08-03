import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// For routes that require any authenticated user (admin or client)
export const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// For routes that require only admin
export const AdminRoute = () => {
  const user = useSelector((state) => state.user.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

// For routes that require any logged-in user (client or admin)
// (You can keep this same as ProtectedRoute or remove if duplicate)
export const ClientRoute = () => {
  const user = useSelector((state) => state.user.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
