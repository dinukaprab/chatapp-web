import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Slide,
  Card,
  FormControl,
  FormHelperText,
  Button,
  Typography,
  Stack,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import CustomTextField from "/src/components/TextFields/CustomTextField";
import { useSnackbar } from "/src/contexts/SnackbarContext/SnackbarContext";

export default function Verification({ emailAddress, withAnimation }) {
  document.title = "OTP Verification | ChatApp";
  const inputRefs = useRef([]);
  const { showSnackbar } = useSnackbar();
  const [error, setError] = useState({ message: "", variant: "" });
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "") && otp.length === 5) {
      handleVerify();
    }
  }, [otp]);

  const handleOtpChange = (index, value) => {
    setError({ message: "", variant: "" });
    const newVal = value.replace(/\D/, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = newVal;
    setOtp(newOtp);

    if (newVal && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    setError({ message: "", variant: "" });
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otp.length);
    if (!paste) return;

    const newOtp = [...otp];
    for (let i = 0; i < otp.length; i++) {
      newOtp[i] = paste[i] || "";
      inputRefs.current[i]?.focus();
    }
    setOtp(newOtp);

    if (paste.length === otp.length) handleVerify();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some((digit) => digit.trim() === "")) {
      setError({ message: "Please fill all OTP fields.", variant: "error" });
      return;
    }

    setLoading(true);
    setError({ message: "", variant: "" });

    try {
      const response = await axios.post("/api/auth/verify-otp", {
        email: emailAddress,
        otp: otp.join(""),
      });

      if (response.data.success) {
        // localStorage.setItem("token", response.data.token);
      } else {
        setError({
          message: response.data.message || "Invalid OTP.",
          variant: "error",
        });
      }
    } catch (error) {
      showSnackbar("Verification failed. Try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    setError({ message: "", variant: "" });
    setOtp(["", "", "", "", ""]);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const response = await axios.post("/api/auth/send-otp", {
        email: emailAddress,
      });

      if (response.data.success) {
        showSnackbar("OTP resent successfully", "success");
        inputRefs.current[0]?.focus();
      } else {
        showSnackbar("Failed to resend OTP. Please try again.", "error");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      showSnackbar("Something went wrong. Please try again later.", "error");
    } finally {
      setResendLoading(false);
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
          {resendLoading && (
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
            OTP Verification
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
            Please enter the OTP sent to your email address.
          </Typography>

          <Box
            component="form"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              "& > :not(style)": { m: 1, width: "32ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                width: "100%",
              }}
            >
              {otp.map((value, i) => (
                <CustomTextField
                  key={i}
                  value={value}
                  type="number"
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  inputRef={(el) => (inputRefs.current[i] = el)}
                  id={`otp-input-${i + 1}`}
                  onPaste={handlePaste}
                  inputProps={{
                    spellCheck: "false",
                    inputMode: "numeric",
                    style: { MozAppearance: "textfield", textAlign: "center" },
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
            {error.message && (
              <FormHelperText
                error={error.variant !== "success"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "100%",
                  color: error.variant === "success" ? "green" : undefined,
                }}
              >
                {error.message}
              </FormHelperText>
            )}

            <FormControl variant="standard">
              <Button
                variant="contained"
                onClick={handleVerify}
                sx={{
                  mt: error.message ? 0 : 2,
                  mb: 2,
                  background: "#212121",
                }}
              >
                <span style={{ opacity: loading ? 0 : 1 }}>Verify</span>
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
            OTP not received?{" "}
            <Box
              component="span"
              onClick={resendOtp}
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
              Resend
            </Box>
          </Typography>
        </Box>
      </Card>
    </Slide>
  );
}
