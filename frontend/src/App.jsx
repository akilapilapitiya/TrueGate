import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Community from "./pages/Community"
import PasswordReset from "./pages/PasswordReset"
import Devices from "./pages/Devices"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import Users from "./pages/Users"
import { ProtectedRoute } from "./utils/ProtectedRoute"

const App = () => {
  const user = true;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        {/*Public Routes*/}
        <Route index element={<Home/>}/>      
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='password-reset' element={<PasswordReset/>}/>
        {/*Protected Routes*/ }
        <Route element={<ProtectedRoute />}>
        <Route path='profile' element={<Profile/>}/>
        <Route path='community' element={<Community/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='devices' element={<Devices/>}/>
        <Route path='users' element={<Users/>}/></Route>
        {/*Error 404 Route*/}
        <Route path='*' element={<NotFound/ >}/>
      </Route>
      
    )
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App