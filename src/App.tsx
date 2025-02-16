import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SupportDashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './pages/Unauthorised'
import { useAuth } from './context/AuthContext'

const App = () => {
  const { authorised } = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/unauthorised' element={!authorised ? <Unauthorized />: <Navigate to="/"/>} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!authorised ? <Login />: <Navigate to="/dashboard"/>} />
        <Route path='/register' element={!authorised ? <Register />: <Navigate to="/dashboard"/>} />
        <Route path='/dashboard'
          element={
            <ProtectedRoute roles={["agent", "customer"]}>
              <SupportDashboard />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
