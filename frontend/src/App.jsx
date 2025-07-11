import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Layout and Pages
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
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Footage from "./pages/Footage";
import AccessHistory from "./pages/AccessHistory";

// Route Guards
import { ProtectedRoute, AdminRoute } from "./utils/ProtectedRoute";

// 🔁 OPTIONAL: Use mock data temporarily
// 🚫 REMOVE THESE LINES once you integrate your real auth system or Redux state
import { useSelector } from "react-redux";
import Settings from "./pages/Settings";
// const [user, setUser] = useState(true); //MOCK USER — remove this
// const [admin, setAdmin] = useState(true); //MOCK ADMIN — remove this

const App = () => {
  // Use Redux state instead of mock values
  const user = useSelector((state) => state.user); // Gets user from Redux store
  const admin = user?.role === "admin"; // Sets admin based on user role

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/*Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="password-reset" element={<PasswordReset />} />
        <Route path="about" element={<About />} />
        <Route path="error-page" element={<ErrorPage />} />

        {/*Protected Routes - only visible if logged in */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="community" element={<Community />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="footage" element={<Footage />} />
          <Route path="history" element={<AccessHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/*Admin-Only Routes */}
        <Route element={<AdminRoute user={user} admin={admin} />}>
          <Route path="devices" element={<Devices />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/*Catch-all Route (404) */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  // 🚀 Wrap App with RouterProvider
  return <RouterProvider router={router} />;
};

export default App;
