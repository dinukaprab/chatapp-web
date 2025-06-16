import { Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function ChatApp() {
  return (
    <Box
      sx={{
        height: "94vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#1E201E",
          fontWeight: 800,
          maxWidth: "500px",
          cursor: "default",
          userSelect: "none",
        }}
      >
        Welcome to ChatApp
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#999999",
          maxWidth: "500px",
          cursor: "default",
          userSelect: "none",
        }}
      >
        A simple and secure place to stay connected with your friends and
        family.
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LockOutlinedIcon sx={{ color: "#999999", fontSize: 14 }} />
        <Typography
          variant="subtitle1"
          sx={{
            color: "#999999",
            fontSize: 13,
            maxWidth: "500px",
            cursor: "default",
            userSelect: "none",
          }}
        >
          End-To-End Encrypted
        </Typography>
      </Box>
    </Box>
  );
}
