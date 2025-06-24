import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const CustomTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#EEEEEE",
    border: "1px solid #757575",
    borderColor: "#E0E3E7",
    fontSize: 16,
    width: "100%",
    padding: "8px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&::selection": {
      backgroundColor: "#424242",
      color: "white",
    },
    "&:focus": {
      boxShadow: `${alpha("#424242", 0.25)} 0 0 0 0.2rem`,
      borderColor: "#757575",
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));

export default CustomTextField;
