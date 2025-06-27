import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import WelcomeLoader from "/src/components/Loaders/WelcomeLoader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const checkToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get("/api/user/check-auth", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 200) {
                setIsAuthenticated(true);
                setUser(res.data.user || null);
            } else {
                logout();
            }
        } catch (err) {
            console.error("Token validation error:", err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setUser(null);
    };

    const logout = async () => {
        const token = localStorage.getItem("token");

        try {
            if (token) {
                await axios.post(
                    "/api/user/logout",
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkToken();

        const interval = setInterval(checkToken, 30000);

        const storageListener = (e) => {
            if (e.key === "token") checkToken();
        };

        window.addEventListener("storage", storageListener);

        return () => {
            clearInterval(interval);
            window.removeEventListener("storage", storageListener);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {loading ? <WelcomeLoader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);