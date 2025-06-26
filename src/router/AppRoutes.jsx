import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
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
      axios.get("/api/auth/check-username-is-created").then((res) => {
        if (res.data?.username) {
          setUsernameCreated(true);
        }
      }).catch((err) => {
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
    return (<div>Loading...</div>)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <BaseLayout Content={<Home />} />
          ) : (
            <Auth
              onLogin={() => setIsLoggedIn(true)}
              onUsernameCreated={usernameCreated}
            />
          )
        }
      />
      <Route
        path="/:username"
        element={<BaseLayout Content={<ChatWindow />} />}
      />
    </Routes>
  );
}
