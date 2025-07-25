import { Navigate, Outlet, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

export const ProtectedRoute = () => {
    const location = useLocation();
    const api = ApiService();

    return api.isAuthenticated() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};



export const AdminRoute = () => {
    const location = useLocation();
    const api = ApiService();

    return api.isAdmin() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};
