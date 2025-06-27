import ProtectedRoute from "./ProtectedRoute";

const AppProtectedRoute = ({ children }) => {
    const onUnauthenticated = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <ProtectedRoute onUnauthenticated={onUnauthenticated}>
            {children}
        </ProtectedRoute>
    );
};

export default AppProtectedRoute;
