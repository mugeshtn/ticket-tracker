import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { HeroUIProvider } from '@heroui/react'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthProvider>
      <ToastContainer/>
        <App />
      </AuthProvider>
    </HeroUIProvider>
  </StrictMode>,
)
