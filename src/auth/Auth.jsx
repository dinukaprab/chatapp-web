import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Verification from "./Verification/Verification";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#F1F1F2",
        height: "100vh",
        overflow: "hidden",
        // backgroundImage:
        //   "url(/src/assets/images/gray-abstract-wireframe-background.png)",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backdropFilter: "saturate(180%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {showVerification ? (
          <Verification
            emailAddress={emailAddress}
            withAnimation={withAnimation}
          />
        ) : showForgotPassword ? (
          <ForgotPassword
            onSwitchToLogin={() => {
              setShowForgotPassword(false);
              setShowLogin(true);
              setWithAnimation(true);
            }}
            withAnimation={true}
          />
        ) : showLogin ? (
          <Login
            onSwitch={() => handleSwitch(false)}
            onOtpSent={(email) => {
              setEmailAddress(email);
              setShowVerification(true);
            }}
            onForgotPassword={handleForgotPassword}
            withAnimation={withAnimation}
          />
        ) : (
          <Register
            onSwitch={() => handleSwitch(true)}
            withAnimation={withAnimation}
          />
        )}
      </Box>
    </Box>
  );
}
