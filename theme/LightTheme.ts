import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: "#ffffff",
    },
    success: {
      main: colors.success[500],
      light: colors.success[300],
      dark: colors.success[700],
      contrastText: "#ffffff",
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[300],
      dark: colors.warning[700],
      contrastText: "#ffffff",
    },
    error: {
      main: colors.error[500],
      light: colors.error[300],
      dark: colors.error[700],
      contrastText: "#ffffff",
    },
    info: {
      main: colors.info[500],
      light: colors.info[300],
      dark: colors.info[700],
      contrastText: "#ffffff",
    },
    background: {
      default: colors.gray[50],
      paper: "#ffffff",
    },
    text: {
      primary: colors.gray[900],
      secondary: colors.gray[600],
      disabled: colors.gray[400],
    },
    divider: colors.gray[200],
    action: {
      hover: colors.primary[100], // Changed from gray[100] to a light green hover
      selected: colors.primary[50],
      disabled: colors.gray[300],
      focus: colors.primary[200], // Add focus color for accessibility
      activatedOpacity: 0.12,
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
    // Use green-tinted or neutral shadows instead of blue shadows
    "0px 1px 3px rgba(0, 139, 44, 0.1), 0px 1px 2px rgba(0, 139, 44, 0.06)",
    "0px 4px 6px -1px rgba(0, 139, 44, 0.1), 0px 2px 4px -1px rgba(0, 139, 44, 0.06)",
    "0px 10px 15px -3px rgba(0, 139, 44, 0.1), 0px 4px 6px -2px rgba(0, 139, 44, 0.05)",
    "0px 20px 25px -5px rgba(0, 139, 44, 0.1), 0px 10px 10px -5px rgba(0, 139, 44, 0.04)",
    "0px 25px 50px -12px rgba(0, 139, 44, 0.25)",
    ...Array(19).fill("0px 25px 50px -12px rgba(0, 139, 44, 0.25)"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: `0px 4px 12px ${colors.primary[300]}55`,
            backgroundColor: colors.primary[100],
          },
          "&:focus-visible": {
            outline: `2px solid ${colors.primary[400]}`,
            outlineOffset: "2px",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: `0px 4px 12px ${colors.primary[400]}88`, // stronger green shadow
            backgroundColor: colors.primary[400],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0px 1px 3px ${colors.gray[400]}33, 0px 1px 2px ${colors.gray[400]}22`,
          border: `1px solid ${colors.gray[200]}`,
          "&:hover": {
            boxShadow: `0px 4px 10px ${colors.primary[200]}44, 0px 2px 4px ${colors.primary[200]}33`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // you can add subtle shadows or focus states here if needed
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: colors.gray[900],
          boxShadow: `0px 1px 3px ${colors.gray[300]}88`,
          borderBottom: `1px solid ${colors.gray[200]}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${colors.gray[200]}`,
          boxShadow: `0px 4px 6px -1px ${colors.gray[300]}88`,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          margin: "2px 0",
          "&:hover": {
            backgroundColor: colors.primary[100], // green hover instead of gray
            color: colors.primary[700],
          },
          "&.Mui-selected": {
            backgroundColor: colors.primary[50],
            color: colors.primary[700],
            "&:hover": {
              backgroundColor: colors.primary[200],
            },
          },
          "&.Mui-focusVisible": {
            outline: `2px solid ${colors.primary[400]}`,
            outlineOffset: "2px",
          },
        },
      },
    },
  },
});
