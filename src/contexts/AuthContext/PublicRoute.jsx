import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const PublicRoute = ({ children, onAlreadyAuthenticated }) => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            onAlreadyAuthenticated?.();
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) return null;

    return !isAuthenticated ? children : null;
};

export default PublicRoute;
