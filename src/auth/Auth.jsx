import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Verification from "./Verification/Verification";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
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
        ) : showLogin ? (
          <Login
            onSwitch={() => handleSwitch(false)}
            onOtpSent={(email) => {
              setEmailAddress(email);
              setShowVerification(true);
            }}
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
