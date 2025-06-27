import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, onUnauthenticated }) => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated === false) {
            onUnauthenticated?.();
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) return null;

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
