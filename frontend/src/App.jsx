import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import PasswordReset from "./pages/PasswordReset";
import Devices from "./pages/Devices";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import { ProtectedRoute, AdminRoute } from "./utils/ProtectedRoute";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Footage from "./pages/Footage";
import AccessHistory from "./pages/AccessHistory";

const App = () => {
  const [user, setUser] = useState(true); // Testing
  const [admin, setAdmin] = useState(true); // Testing

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="password-reset" element={<PasswordReset />} />
        <Route path="about" element={<About />} />
        <Route path="error-page" element={<ErrorPage/>}/>

        {/* Protected Routes - all logged-in users */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="community" element={<Community />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="footage" element={<Footage />} />
          <Route path="history" element={<AccessHistory />} />

        </Route>

        {/* Admin Routes - only admin users */}
        <Route element={<AdminRoute user={user} admin={admin} />}>
          <Route path="devices" element={<Devices />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
