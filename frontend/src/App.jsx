import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserManage from "./pages/UserManage";
import NotFound from "./components/NotFound";
import PasswordReset from "./pages/PasswordReset";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<ProtectedRoute requireAdmin={true} ><Dashboard /></ProtectedRoute>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="manage" element={<ProtectedRoute requireAdmin={true} ><UserManage /></ProtectedRoute>} />
      <Route path="resetpassword" element={<PasswordReset />} />
      <Route path="error" element={<ErrorPage/>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
