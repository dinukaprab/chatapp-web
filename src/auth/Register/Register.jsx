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
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import DiscordIcon from "/src/assets/icons/DiscordIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomTextField from "/src/components/TextFields/CustomTextField";

export default function Register({ onSwitch, withAnimation, accountCreated }) {
  document.title = "Register | ChatApp";
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setGoogleLoading(false);
    setDiscordLoading(false);

    setError("");
    setFirstNameError("");
    setEmailAddressError("");
    setPasswordError("");
    setRepeatPasswordError("");

    if (!firstName) {
      setFirstNameError("First name is required.");
      setLoading(false);
      return;
    }
    if (!emailAddress) {
      setEmailAddressError("Email address is required.");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setEmailAddressError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError("Password is required.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      setLoading(false);
      return;
    }

    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number.");
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      setLoading(false);
      return;
    }

    if (password.length > 64) {
      setPasswordError("Password must not exceed 64 characters.");
      setLoading(false);
      return;
    }

    if (!repeatPassword) {
      setRepeatPasswordError("Please repeat your password.");
      setLoading(false);
      return;
    }

    if (repeatPassword.length < 8) {
      setRepeatPasswordError(
        "Repeated password must be at least 8 characters long."
      );
      setLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        email: emailAddress,
        password,
        firstName,
        lastName,
      });
      if (response.data.success) {
        accountCreated(true);
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Slide
      direction="left"
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
            Register to ChatApp
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
            Let's get you started with your account
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
              "& > :not(style)": { m: 1, width: "38ch" },
            }}
            noValidate
            autoComplete="on"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl variant="standard" sx={{ flex: 1 }}>
                <InputLabel
                  shrink
                  htmlFor="first-name-input"
                  sx={{
                    color: firstNameError ? "red" : "black",
                    "&.Mui-focused": {
                      color: firstNameError ? "red" : "black",
                    },
                  }}
                >
                  First Name
                </InputLabel>
                <CustomTextField
                  fullWidth
                  id="first-name-input"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setError("");
                    setPasswordError("");
                    setRepeatPasswordError("");
                    setFirstName(e.target.value);
                  }}
                  inputProps={{
                    spellCheck: "false",
                  }}
                />

                {firstNameError && (
                  <FormHelperText sx={{ ml: 1, color: "red" }}>
                    {firstNameError}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl variant="standard" sx={{ flex: 1 }}>
                <InputLabel
                  shrink
                  htmlFor="last-name-input"
                  sx={{
                    "&.Mui-focused": {
                      color: "black",
                    },
                  }}
                >
                  Last Name (optional)
                </InputLabel>
                <CustomTextField
                  fullWidth
                  id="last-name-input"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setError("");
                    setPasswordError("");
                    setRepeatPasswordError("");
                    setLastName(e.target.value);
                  }}
                  inputProps={{ spellCheck: "false" }}
                />
              </FormControl>
            </Box>
            <FormControl variant="standard" sx={{ flex: 1 }}>
              <InputLabel
                shrink
                htmlFor="email-address-input"
                sx={{
                  color: emailAddressError ? "red" : "black",
                  "&.Mui-focused": {
                    color: emailAddressError ? "red" : "black",
                  },
                }}
              >
                Email Address
              </InputLabel>
              <CustomTextField
                fullWidth
                id="email-address-input"
                type="text"
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => {
                  setError("");
                  setPasswordError("");
                  setRepeatPasswordError("");
                  setEmailAddress(e.target.value);
                }}
                inputProps={{ spellCheck: "false" }}
              />
              {emailAddressError && (
                <FormHelperText sx={{ ml: 1, color: "red" }}>
                  {emailAddressError}
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
              <CustomTextField
                fullWidth
                id="password-input"
                placeholder="Password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setError("");
                  setPasswordError("");
                  setRepeatPasswordError("");
                  setPassword(e.target.value);
                }}
                inputProps={{ spellCheck: "false" }}
              />
              <Box
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 35,
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
            <FormControl
              variant="standard"
              sx={{ position: "relative", width: "100%" }}
            >
              <InputLabel
                shrink
                htmlFor="repeat-password-input"
                sx={{
                  color: repeatPasswordError ? "red" : "black",
                  "&.Mui-focused": {
                    color: repeatPasswordError ? "red" : "black",
                  },
                }}
              >
                Repeat Password
              </InputLabel>
              <CustomTextField
                fullWidth
                id="repeat-password-input"
                placeholder="Password"
                value={repeatPassword}
                type={showRepeatPassword ? "text" : "password"}
                onChange={(e) => {
                  setError("");
                  setPasswordError("");
                  setRepeatPasswordError("");
                  setRepeatPassword(e.target.value);
                }}
                inputProps={{ spellCheck: "false" }}
              />
              <Box
                onClick={() => setShowRepeatPassword((prev) => !prev)}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 35,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showRepeatPassword ? (
                  <VisibilityOffIcon sx={{ color: "#757575", fontSize: 20 }} />
                ) : (
                  <VisibilityIcon sx={{ color: "#757575", fontSize: 20 }} />
                )}
              </Box>
              {repeatPasswordError && (
                <FormHelperText sx={{ ml: 1, color: "red" }}>
                  {repeatPasswordError}
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
                onClick={handleRegister}
                sx={{
                  mt: 2,
                  mb: 2,
                  background: "#212121",
                }}
              >
                <span style={{ opacity: loading ? 0 : 1 }}>Register</span>
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
            Already have an account?{" "}
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
              Sign in
            </Box>
          </Typography>
        </Box>
      </Card>
    </Slide>
  );
}
