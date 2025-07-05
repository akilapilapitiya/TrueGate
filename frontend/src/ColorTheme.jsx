import { createTheme } from "@mui/material/styles";
import '@fontsource/poppins';

// Light Theme Colors
const lightColors = {
  mode: "light",
  sidebarBackground: "#3b4a62",
  pageBackground: "#f4f7fa",
  headerButton: "#71f2d6",
  textPrimary: "#1a1a1a",
  textSecondary: "#3b4a62",
  logoutButton: "#71f2d6",
};

// Dark Theme Colors
const darkColors = {
  mode: "dark",
  sidebarBackground: "#1e1e2f",
  pageBackground: "#121212",
  headerButton: "#71f2d6",
  textPrimary: "#ffffff",
  textSecondary: "#cccccc",
  logoutButton: "#71f2d6",
};

// Create Theme
const getTheme = (colors) =>
  createTheme({
    palette: {
      mode: colors.mode,
      primary: {
        main: colors.sidebarBackground,
        contrastText: colors.textPrimary,
      },
      secondary: {
        main: colors.headerButton,
      },
      background: {
        default: colors.pageBackground,
        paper: colors.sidebarBackground,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 'bold',
            textTransform: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.sidebarBackground,
            color: colors.textPrimary,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  });

export { lightColors, darkColors, getTheme };
