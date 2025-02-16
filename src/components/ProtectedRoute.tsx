import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles: string[] }) => {

    const { authorised, role } = useAuth()


    if (!authorised) return <Navigate to="/login" />
    if (!roles.includes(role)) return <Navigate to="/unauthorised" />

    return children
}

export default ProtectedRoute