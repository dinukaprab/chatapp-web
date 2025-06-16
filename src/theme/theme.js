import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#9C27B0",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
    fontVariationSettings: "wdth 100",
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "gray",
        },
      },
    },
  },
});

export default theme;
