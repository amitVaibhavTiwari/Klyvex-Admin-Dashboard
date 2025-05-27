import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary[400],
      light: colors.primary[300],
      dark: colors.primary[600],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.secondary[400],
      light: colors.secondary[300],
      dark: colors.secondary[600],
      contrastText: "#ffffff",
    },
    success: {
      main: colors.success[400],
      light: colors.success[300],
      dark: colors.success[600],
      contrastText: "#ffffff",
    },
    warning: {
      main: colors.warning[400],
      light: colors.warning[300],
      dark: colors.warning[600],
      contrastText: "#ffffff",
    },
    error: {
      main: colors.error[400],
      light: colors.error[300],
      dark: colors.error[600],
      contrastText: "#ffffff",
    },
    info: {
      main: colors.info[400],
      light: colors.info[300],
      dark: colors.info[600],
      contrastText: "#ffffff",
    },
    background: {
      default: colors.dark.background,
      paper: colors.dark.paper,
    },
    text: {
      primary: colors.gray[100],
      secondary: colors.gray[400],
      disabled: colors.gray[600],
    },
    divider: colors.dark.border,
    action: {
      hover: colors.gray[800],
      selected: colors.primary[900],
      disabled: colors.gray[700],
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    // borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.2)",
    "0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "0px 10px 15px -3px rgba(0, 0, 0, 0.3), 0px 4px 6px -2px rgba(0, 0, 0, 0.2)",
    "0px 20px 25px -5px rgba(0, 0, 0, 0.4), 0px 10px 10px -5px rgba(0, 0, 0, 0.2)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 8,
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.3)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(129, 140, 248, 0.4)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: 16,
          backgroundColor: colors.dark.paper,
          border: `1px solid ${colors.dark.border}`,
          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 12,
          backgroundColor: colors.dark.paper,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark.paper,
          color: colors.gray[100],
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
          borderBottom: `1px solid ${colors.dark.border}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.dark.paper,
          borderRight: `1px solid ${colors.dark.border}`,
          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // borderRadius: 8,
          margin: "2px 0",
          "&:hover": {
            backgroundColor: colors.gray[800],
          },
          "&.Mui-selected": {
            backgroundColor: colors.primary[900],
            color: colors.primary[300],
            "&:hover": {
              backgroundColor: colors.primary[800],
            },
          },
        },
      },
    },
  },
});
