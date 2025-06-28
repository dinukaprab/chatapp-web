import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

const AppProtectedRoute = ({ children }) => {
    const onUnauthenticated = () => {
        localStorage.removeItem("token");
        return <Navigate to="/" replace />;
    };

    return (
        <ProtectedRoute onUnauthenticated={onUnauthenticated}>
            {children}
        </ProtectedRoute>
    );
};

export default AppProtectedRoute;
