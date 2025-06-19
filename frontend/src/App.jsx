import { useState } from 'react'
import Home from './pages/Home'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Support from './pages/Support'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import RootLayout from './layout/RootLayout'
import NotFound from './components/NotFound'



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login />}/>
      <Route path='register' element={<Register />}/>
      <Route path='contact' element={<Contact />}/>
      <Route path='support' element={<Support />}/>
      <Route path='dashboard' element={<Dashboard />}/>
      <Route path='*' element={<NotFound />}/>
      </Route>
    )
  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App
