import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AppProtectedRoute from "/src/contexts/AuthContext/AppProtectedRoute";
import AppPublicRoute from "/src/contexts/AuthContext/AppPublicRoute";
import WelcomeLoader from "/src/components/Loaders/WelcomeLoader";
import BaseLayout from "/src/components/Layouts/BaseLayout";
import Home from "/src/pages/Home/Home";
import Auth from "/src/auth/Auth";
import ChatWindow from "/src/pages/ChatWindow/ChatWindow";

export default function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameCreated, setUsernameCreated] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/api/user/v1/check-username-is-created", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data?.username) {
            setUsernameCreated(true);
          }
        })
        .catch((err) => {
          console.error("Auth check failed", err);
          setUsernameCreated(false);
        }).finally(
          setLoading(false)
        )
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setLoading(false)
    }

  }, []);

  if (loading) {
    return <WelcomeLoader />
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <AppProtectedRoute>
              <BaseLayout Content={<Home />} />
            </AppProtectedRoute>
          ) : (
            <AppPublicRoute>
              <Auth
                onLogin={() => setIsLoggedIn(true)}
                onUsernameCreated={usernameCreated}
              />
            </AppPublicRoute>
          )
        }
      />
      <Route
        path="/:username"
        element={
          <AppProtectedRoute>
            <BaseLayout Content={<ChatWindow />} />
          </AppProtectedRoute>
        }
      />
    </Routes>
  );
}
