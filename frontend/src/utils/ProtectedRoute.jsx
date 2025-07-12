import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

//Email Verified Check
const VerifiedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (!user.emailVerified) return <Navigate to="/email-verify" replace />;
  return <Outlet />;
};


export { ProtectedRoute, AdminRoute, VerifiedRoute };
