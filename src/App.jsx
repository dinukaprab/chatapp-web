import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "/src/contexts/AuthContext/AuthContext";
import { SnackbarProvider } from "/src/contexts/SnackbarContext/SnackbarContext";
import AppRoutes from "/src/router/AppRoutes";
import theme from "/src/theme/theme";
import "./App.css"

export default function App() {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <AuthProvider>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <CssBaseline />
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}
