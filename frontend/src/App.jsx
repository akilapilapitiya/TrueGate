import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Layout
import RootLayout from "./layout/RootLayout";

// Home Priority
import Home from "./pages/Home";

// Custom Loading Spinner
import LoadingSpinner from "./components/LoadingSpinner";

// Route Guards
import { ProtectedRoute, AdminRoute, ClientRoute } from "./utils/ProtectedRoute";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Community = lazy(() => import("./pages/Community"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));
const Devices = lazy(() => import("./pages/Devices"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Users = lazy(() => import("./pages/Users"));
const About = lazy(() => import("./pages/About"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Footage = lazy(() => import("./pages/Footage"));
const AccessHistory = lazy(() => import("./pages/AccessHistory"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
import EmailVerificationNotice from "./pages/EmailVerificationNotice";

// Optional future admin-only route
// const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="password-reset" element={<PasswordReset />} />
        <Route path="about" element={<About />} />
        <Route path="error-page" element={<ErrorPage />} />

        {/* Authenticated Routes (Client + Admin) */}
        <Route element={<ClientRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="email-verify" element={<EmailVerificationNotice />} />
          <Route path="community" element={<Community />} />
          <Route path="footage" element={<Footage />} />
          <Route path="history" element={<AccessHistory />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* These two are client-specific, but guarded here */}
          <Route path="devices" element={<Devices />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* Admin-only Routes */}
        <Route element={<AdminRoute />}>
          {/* Add your admin-exclusive routes here, e.g.: */}
          {/* <Route path="admin-dashboard" element={<AdminDashboard />} /> */}
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <Suspense fallback={<LoadingSpinner size="medium" variant="overlay" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
