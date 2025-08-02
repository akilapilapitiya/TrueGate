import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminRoute = () => {
  const user = useSelector((state) => state.user.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

export const VerifiedRoute = () => {
  const user = useSelector((state) => state.user.user);
  if (!user) return <Navigate to="/login" replace />;
  if (!user.emailVerified) return <Navigate to="/email-verify" replace />;
  return <Outlet />;
};
