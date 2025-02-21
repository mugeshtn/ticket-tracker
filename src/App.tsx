import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SupportDashboard from './pages/SupportDash'
import Unauthorized from './pages/Unauthorised'
import { useAuth } from './context/AuthContext'
import UserDashboard from './pages/UserDash'

const App = () => {
  const { role, authorised } = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/unauthorised' element={!authorised ? <Unauthorized /> : <Navigate to="/" />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!authorised ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path='/register' element={!authorised ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path='/dashboard'
          element={
            role === "customer"
              ? <UserDashboard />
              : <SupportDashboard />
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
