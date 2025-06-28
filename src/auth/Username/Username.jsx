import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Slide,
  Card,
  FormControl,
  Button,
  Typography,
  Stack,
  LinearProgress,
  FormHelperText,
} from "@mui/material";
import CustomTextField from "/src/components/TextFields/CustomTextField";

export default function Username({ onUsernameSelected, withAnimation }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("")
  const [usernameError, setUsernameError] = useState({
    message: "",
    variant: "",
  });
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);

  const checkUsernameAvailability = async (value) => {
    if (!value) return;

    setUsernameError({ message: "Checking...", variant: "success" });

    try {
      const response = await axios.get(
        `/api/auth/v1/check-username?username=${encodeURIComponent(value)}`
      );
      if (response.data.available) {
        setAvailable(true);
        setUsernameError({ message: "Username is available.", variant: "success" });
      } else {
        setAvailable(false);
        setUsernameError({
          message: "Username is already taken",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Check error:", error);
      setAvailable(false);
      setUsernameError({
        message: "Error checking username",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (username.length < 4) {
      setUsernameError({
        message: "Username must be at least 4 characters long.",
        variant: "default",
      });
      setAvailable(false);
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError({
        message: "Only letters and numbers allowed.",
        variant: "error",
      });
      setAvailable(false);
      return;
    }

    if (!/\d/.test(username)) {
      setUsernameError({
        message: "Username must include at least one number",
        variant: "error",
      });
      setAvailable(false);
      return;
    }

    const letterCount = (username.match(/[a-zA-Z]/g) || []).length;
    if (letterCount < 4) {
      setUsernameError({
        message: "Username must include at least 4 letters.",
        variant: "error",
      });
      setAvailable(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [username]);

  const handleCreateUsername = async () => {
    if (!available) return;

    setUsernameError({
      message: "",
      variant: "",
    });
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/v1/create-username", {
        username,
      });
      if (response.data.success) onUsernameSelected(username);
      else {
        setError(response.data.message || "Failed to create username");
      }
    } catch (error) {
      console.error("Create error:", error);
      setError("Error creating username");
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
            Create a Username
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              marginBottom: 2,
              color: "#555555",
              fontFamily: "Noto Sans, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 400,
              fontOpticalSizing: "auto",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
            }}
          >
            Make a unique username for your account.
          </Typography>
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
            <FormControl variant="standard" sx={{ flex: 1 }}>
              <CustomTextField
                fullWidth
                id="username-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                error={Boolean(usernameError.message)}
                inputProps={{
                  spellCheck: "false",
                }}
              />

              {usernameError.message && (
                <FormHelperText
                  sx={{
                    ml: 1,
                    color:
                      usernameError.variant === "error"
                        ? "#fa2323"
                        : usernameError.variant === "success"
                          ? "#04b34f"
                          : undefined,
                  }}
                >
                  {usernameError.message}
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
            <FormControl
              variant="standard"
              sx={{ cursor: !available ? "not-allowed" : "pointer" }}
            >
              <Button
                variant="contained"
                onClick={available ? handleCreateUsername : undefined}
                disableRipple={!available}
                disabled={!available}
                sx={{
                  mt: 2,
                  mb: 2,
                  background: "#212121",
                  cursor: !available ? "not-allowed" : "pointer",
                  "&.Mui-disabled": {
                    background: "#212121",
                    color: "#fff",
                    boxShadow: "none",
                    cursor: "not-allowed",
                  },
                }}
              >
                Create
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Card>
    </Slide>
  );
}
