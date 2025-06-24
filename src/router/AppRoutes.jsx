import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BaseLayout from "/src/components/Layouts/BaseLayout";
import Home from "/src/pages/Home/Home";
import Login from "/src/auth/Login";
import ChatWindow from "/src/pages/ChatWindow/ChatWindow";

export default function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <BaseLayout Content={<Home />} />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
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
