import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Login from "./Login/Login";
import Register from "./Register/Register";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [withAnimation, setWithAnimation] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem("authPage");
    setShowLogin(last !== "register");
    setMounted(true);
  }, []);

  const handleSwitch = (toLogin) => {
    setShowLogin(toLogin);
    localStorage.setItem("authPage", toLogin ? "login" : "register");
    setWithAnimation(true);
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {showLogin ? (
        <Login
          onSwitch={() => handleSwitch(false)}
          withAnimation={withAnimation}
        />
      ) : (
        <Register
          onSwitch={() => handleSwitch(true)}
          withAnimation={withAnimation}
        />
      )}
    </Box>
  );
}
