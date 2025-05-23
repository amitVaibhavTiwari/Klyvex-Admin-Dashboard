import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark'
    primary: {
      main: "#dc004e", // black
    },
    secondary: {
      main: "#dc004e", // Pink
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  // You can customize components here too
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
