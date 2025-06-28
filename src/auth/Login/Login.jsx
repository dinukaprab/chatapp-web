import { useState } from "react";
import axios from "axios";
import {
  Box,
  Slide,
  Card,
  FormControl,
  InputLabel,
  Button,
  Divider,
  Typography,
  Stack,
  LinearProgress,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import DiscordIcon from "/src/assets/icons/DiscordIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomTextField from "/src/components/TextFields/CustomTextField";
import { useSnackbar } from "/src/contexts/SnackbarContext/SnackbarContext";

export default function Login({
  onSwitch,
  withAnimation,
  onOtpSent,
  onForgotPassword,
}) {
  document.title = "Login | ChatApp";
  const { showSnackbar } = useSnackbar();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setGoogleLoading(false);
    setDiscordLoading(false);

    setError("");
    setIdentifierError("");
    setPasswordError("");

    if (!identifier) {
      setLoading(false);
      setIdentifierError("email or username cannot be empty");
      return;
    }

    if (!password) {
      setLoading(false);
      setPasswordError("password cannot be empty");
      return;
    }

    try {
      const response = await axios.post("/api/auth/v1/login", {
        identifier,
        password,
      });

      if (response.data.success) {
        const otpResponse = await axios.post("/api/auth/v1/send-login-otp", {
          email: identifier,
        });

        if (otpResponse.data.success) {
          onOtpSent(identifier);
          showSnackbar(otpResponse.data.message, "success");
        } else {
          setError(otpResponse.data.message || "Failed to send OTP");
        }
      } else {
        setError(response.data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login/OTP error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <Slide
      direction="right"
      in={true}
      mountOnEnter
      unmountOnExit
      appear={withAnimation}
      timeout={withAnimation ? 300 : 0}
    >
      <Card
        sx={{
          width: { xs: 300, md: 400 },
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#F6F6F7",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            padding: 2,
            paddingTop: 4,
            border: "1px solid #E0E0E0",
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FFFFFF",
          }}
        >
          {loading && (
            <Stack
              sx={{
                position: "absolute",
                top: 0,
                width: "100%",
                color: "grey.500",
              }}
              spacing={2}
            >
              <LinearProgress color="inherit" />
            </Stack>
          )}
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              color: "#333333",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.96rem",
              fontWeight: 700,
              fontOpticalSizing: "auto",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
            }}
          >
            Login to ChatApp
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              color: "#555555",
              fontFamily: "Noto Sans, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 400,
              fontOpticalSizing: "auto",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
            }}
          >
            Welcome Back! Please sign in to continue.
          </Typography>
          <Box
            sx={{
              mt: 2,
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E0E0E0",
                borderRadius: 1,
                padding: "5px 20px",
                minWidth: "110px",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F0F0F0",
                },
              }}
            >
              <CircularProgress
                color="inherit"
                size="20px"
                sx={{
                  position: "absolute",
                  opacity: googleLoading ? 1 : 0,
                }}
              />
              <GoogleIcon
                sx={{
                  fontSize: 20,
                  opacity: googleLoading ? 0 : 1,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#333333",
                  opacity: googleLoading ? 0 : 1,
                }}
              >
                Google
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E0E0E0",
                borderRadius: 1,
                padding: "5px 20px",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F0F0F0",
                },
              }}
            >
              <CircularProgress
                color="inherit"
                size="20px"
                sx={{
                  position: "absolute",
                  opacity: discordLoading ? 1 : 0,
                }}
              />
              <DiscordIcon sx={{ opacity: discordLoading ? 0 : 1 }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#333333",
                  opacity: discordLoading ? 0 : 1,
                }}
              >
                Discord
              </Typography>
            </Box>
          </Box>
          <Divider
            variant="middle"
            color="#E0E0E0"
            sx={{ width: "75%", margin: 2 }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "#888888",
                fontOpticalSizing: "auto",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
                userSelect: "none",
              }}
            >
              OR
            </Typography>
          </Divider>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              "& > :not(style)": { m: 1, width: "32ch" },
            }}
            noValidate
            autoComplete="on"
          >
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="identifier-input"
                sx={{
                  color: identifierError ? "red" : "black",
                  "&.Mui-focused": {
                    color: identifierError ? "red" : "black",
                  },
                }}
              >
                Email Address or Username
              </InputLabel>
              <CustomTextField
                fullWidth
                id="identifier-input"
                type="text"
                placeholder="Email Address or Username"
                value={identifier}
                onChange={(e) => {
                  setError("");
                  setIdentifierError("");
                  setPasswordError("");
                  setIdentifier(e.target.value);
                }}
                inputProps={{ spellCheck: "false" }}
              />
              {identifierError && (
                <FormHelperText sx={{ ml: 1, color: "red" }}>
                  {identifierError}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ position: "relative", width: "100%" }}
            >
              <InputLabel
                shrink
                htmlFor="password-input"
                sx={{
                  color: passwordError ? "red" : "black",
                  "&.Mui-focused": {
                    color: passwordError ? "red" : "black",
                  },
                }}
              >
                Password
              </InputLabel>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#212121",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontFamily: "Roboto, sans-serif",
                    fontVariationSettings: "'wdth' 100",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: 0,
                      height: "1px",
                      bottom: 4,
                      left: 0,
                      backgroundColor: "#212121",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                  onClick={onForgotPassword}
                >
                  Forgot password?
                </Typography>
              </Box>
              <CustomTextField
                fullWidth
                id="password-input"
                placeholder="Password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setError("");
                  setIdentifierError("");
                  setPasswordError("");
                  setPassword(e.target.value);
                }}
                inputProps={{ spellCheck: "false" }}
              />
              <Box
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 30,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? (
                  <VisibilityOffIcon sx={{ color: "#757575", fontSize: 20 }} />
                ) : (
                  <VisibilityIcon sx={{ color: "#757575", fontSize: 20 }} />
                )}
              </Box>
              {passwordError && (
                <FormHelperText sx={{ ml: 1, color: "red" }}>
                  {passwordError}
                </FormHelperText>
              )}
            </FormControl>
            {error && (
              <FormHelperText
                error
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}
            <FormControl variant="standard">
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                  mt: 2,
                  mb: 2,
                  background: "#212121",
                }}
              >
                <span style={{ opacity: loading ? 0 : 1 }}>Login</span>
                <CircularProgress
                  color="inherit"
                  size="20px"
                  sx={{
                    position: "absolute",
                    opacity: loading ? 1 : 0,
                  }}
                />
              </Button>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#333333",
              fontSize: "0.8rem",
              fontFamily: "Noto Sans, sans-serif",
              fontOpticalSizing: "auto",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
            }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={onSwitch}
              sx={{
                color: "#212121",
                cursor: "pointer",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Roboto, sans-serif",
                fontVariationSettings: "'wdth' 100",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: 0,
                  height: "1px",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "#212121",
                  transition: "width 0.3s ease",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              Sign up
            </Box>
          </Typography>
        </Box>
      </Card>
    </Slide>
  );
}
