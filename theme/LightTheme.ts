import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark'
    primary: {
      main: "#ff1200", // black
    },
    secondary: {
      main: "#dc004e", // Pink
    },
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
