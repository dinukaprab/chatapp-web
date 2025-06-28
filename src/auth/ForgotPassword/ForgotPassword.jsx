import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Slide,
  Card,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Typography,
  Stack,
  CircularProgress,
  LinearProgress,
  FormHelperText,
} from "@mui/material";
import { keyframes } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UndoIcon from "@mui/icons-material/Undo";
import CustomTextField from "/src/components/TextFields/CustomTextField";
import { useSnackbar } from "/src/contexts/SnackbarContext/SnackbarContext";

const waveIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px) rotateZ(0deg);
  }
  50% {
    opacity: 1;
    transform: translateY(0px) rotateZ(2deg);
  }
  100% {
    transform: translateY(0) rotateZ(0deg);
  }
`;

const WaveText = ({ text }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "#555555",
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "0.85rem",
        fontWeight: 400,
        display: "inline-block",
        whiteSpace: "pre-wrap",
      }}
    >
      {text.split("").map((char, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            display: "inline-block",
            animation: `${waveIn} 0.1s ease-out ${i * 0.01}s both`,
          }}
        >
          {char}
        </Box>
      ))}
    </Typography>
  );
};

export default function ForgotPassword({ onSwitchToLogin, withAnimation }) {
  document.title = "Forgot Password | ChatApp";
  const inputRefs = useRef([]);
  const { showSnackbar } = useSnackbar();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [code, setCode] = useState(Array(5).fill(""));
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  const handleSendCode = async () => {
    setSendCodeLoading(true);
    setError("");
    setIdentifierError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!identifier) {
      setIdentifierError("Email address or username is required.");
      setSendCodeLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/v1/forgot-password", {
        identifier,
      });

      if (response.data.success) {
        showSnackbar("A reset code has been sent to your email address.", "success");
        setPassword("");
        setConfirmPassword("");
        setCodeSent(true);
        inputRefs.current[0]?.focus();
      } else {
        setError(
          response.data.message || "An error occurred. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to send reset code. Please try again later.";
      setError(message);
    }
    finally {
      setSendCodeLoading(false);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "") && code.length === 5) {
      handleVerify();
    }
  }, [code]);

  const handleCodeChange = (index, value) => {
    setError("");
    const newVal = value.replace(/\D/, "").slice(0, 1);
    const newCode = [...code];
    newCode[index] = newVal;
    setCode(newCode);

    if (newVal && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    setError("");
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, code.length);
    if (!paste) return;

    const newCode = [...code];
    for (let i = 0; i < code.length; i++) {
      newCode[i] = paste[i] || "";
      inputRefs.current[i]?.focus();
    }
    setCode(newCode);

    if (paste.length === code.length) handleVerify();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (code.some((digit) => digit.trim() === "")) {
      setError("Please fill all OTP fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/v1/verify-forgot-password-otp", {
        identifier,
        otp: code.join(""),
      });

      if (response.data.success) {
        setCodeVerified(true);
      } else {
        setError(response.data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Verification failed. Try again later.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setResendLoading(true);
    setError("");
    setCode(Array(5).fill(""));

    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const response = await axios.post("/api/auth/v1/forgot-password", {
        identifier,
      });

      if (response.data.success) {
        showSnackbar("OTP resent successfully", "success");
        inputRefs.current[0]?.focus();
      } else {
        showSnackbar("Failed to resend OTP. Please try again.", "error");
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Something went wrong. Please try again later.";
      setError(message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleCreatePassword = async () => {
    setVerifyLoading(true);
    setError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!password) {
      setPasswordError("New password is required.");
      setVerifyLoading(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setVerifyLoading(false);
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your new password.");
      setVerifyLoading(false);
      return;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      setVerifyLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/v1/create-new-password", {
        identifier,
        password,
      });
      if (response.data.success) {
        showSnackbar("Password created successfully. You can now log in.", "success");
        setCodeSent(false);
        setCodeVerified(false);
        setPassword("");
        setConfirmPassword("");
        setCode(Array(5).fill(""));
        onSwitchToLogin();
      } else {
        showSnackbar(
          response.data.message || "An error occurred. Please try again.", "error"
        );
      }
    }
    catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to create password. Please try again later.";
      setError(message);
    } finally {
      setVerifyLoading(false);
    }
  };

  const onBack = () => {
    setCodeSent(false);
    setIdentifier("");
    setPassword("");
    setConfirmPassword("");
    setIdentifierError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setError("");
    setCode(Array(5).fill(""));
    setCodeVerified(false);
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
          {(sendCodeLoading || resendLoading || verifyLoading) && (
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
            Forgot password
          </Typography>
          {!codeSent ? (
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                color: "#555555",
                fontFamily: "Noto Sans, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
              }}
            >
              Reset password with your email.
            </Typography>
          ) : !codeVerified ? (
            <WaveText text="Enter the code sent to your email address." />
          ) : (
            <WaveText text="Create your new password." />
          )}
          <Box
            component="form"
            sx={{
              mt: 3,
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
            {!codeSent ? (
              <>
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
              </>
            ) : !codeVerified ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  {code.map((value, i) => (
                    <CustomTextField
                      key={i}
                      value={value}
                      type="number"
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      inputRef={(el) => (inputRefs.current[i] = el)}
                      id={`otp-input-${i + 1}`}
                      onPaste={handlePaste}
                      inputProps={{
                        spellCheck: "false",
                        inputMode: "numeric",
                        style: {
                          MozAppearance: "textfield",
                          textAlign: "center",
                        },
                      }}
                      sx={{
                        "& input::-webkit-outer-spin-button": {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                        "& input::-webkit-inner-spin-button": {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      }}
                    />
                  ))}
                </Box>
              </>
            ) : (
              <>
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
                    New Password
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
                      setConfirmPasswordError("");
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
                      <VisibilityOffIcon
                        sx={{ color: "#757575", fontSize: 20 }}
                      />
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
                      color: confirmPasswordError ? "red" : "black",
                      "&.Mui-focused": {
                        color: confirmPasswordError ? "red" : "black",
                      },
                    }}
                  >
                    Confirm Password
                  </InputLabel>
                  <CustomTextField
                    fullWidth
                    id="repeat-password-input"
                    placeholder="Password"
                    value={confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => {
                      setError("");
                      setPasswordError("");
                      setConfirmPasswordError("");
                      setConfirmPassword(e.target.value);
                    }}
                    inputProps={{ spellCheck: "false" }}
                  />
                  <Box
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: 35,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon
                        sx={{ color: "#757575", fontSize: 20 }}
                      />
                    ) : (
                      <VisibilityIcon sx={{ color: "#757575", fontSize: 20 }} />
                    )}
                  </Box>
                  {confirmPasswordError && (
                    <FormHelperText sx={{ ml: 1, color: "red" }}>
                      {confirmPasswordError}
                    </FormHelperText>
                  )}
                </FormControl>
              </>
            )}

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
                onClick={
                  !codeSent
                    ? handleSendCode
                    : !codeVerified
                      ? handleVerify
                      : handleCreatePassword
                }
                sx={{
                  mt: 2,
                  mb: 2,
                  background: "#212121",
                }}
              >
                {!codeSent ? (
                  <span style={{ opacity: loading ? 0 : 1 }}>Send code</span>
                ) : !codeVerified ? (
                  <span style={{ opacity: loading ? 0 : 1 }}>Verify</span>
                ) : (
                  <span style={{ opacity: loading ? 0 : 1 }}>Create</span>
                )}
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
        {!codeSent || codeVerified ? (
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
              Back to Login?{" "}
              <Box
                component="span"
                onClick={() => onSwitchToLogin()}
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
                Back
              </Box>
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <IconButton
              onClick={onBack}
              sx={{
                position: "absolute",
                left: 30,
                top: "50%",
                transform: "translateY(-50%)",
                padding: 0.5,
              }}
            >
              <UndoIcon
                sx={{
                  fontSize: 22,
                  color: "#555555",
                  "&:hover": { color: "#212121" },
                }}
              />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                color: "#333333",
                fontSize: "0.8rem",
                fontFamily: "Noto Sans, sans-serif",
                textAlign: "center",
              }}
            >
              OTP not received?{" "}
              <Box
                component="span"
                onClick={resendCode}
                sx={{
                  color: "#212121",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontFamily: "Roboto, sans-serif",
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
                Resend
              </Box>
            </Typography>
          </Box>
        )}
      </Card>
    </Slide>
  );
}
