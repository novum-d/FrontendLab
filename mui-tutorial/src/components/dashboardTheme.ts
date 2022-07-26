import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0060ab",
    },
    secondary: {
      main: "#545f71",
    },
    error: {
      main: "#ba1a1a",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a3c9ff",
    },
    secondary: {
      main: "#bcc7db",
    },
    error: {
      main: "#ffb4ab",
    },
  },
});

export { lightTheme, darkTheme };
