import { createTheme } from "@mui/material/styles";
import { lightColors, darkColors } from "./colors";
import { customColors } from "./colors";

const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 300,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 300,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
   customColors: customColors,
};
 
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    ...lightColors,
  },
  customColors: customColors,
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    ...darkColors,
  },
  customColors: customColors,
});
