import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation;

    return auth?.email ? <Outlet /> : <Navigate to="/"  />
   
}

export default RequireAuth;