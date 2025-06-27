import PublicRoute from "./PublicRoute";

const AppPublicRoute = ({ children }) => {
    const onAlreadyAuthenticated = () => {
        window.location.reload();
    };

    return (
        <PublicRoute onAlreadyAuthenticated={onAlreadyAuthenticated}>
            {children}
        </PublicRoute>
    );
};

export default AppPublicRoute;
