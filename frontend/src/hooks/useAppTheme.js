// hooks/useAppTheme.js
import { useTheme } from "@mui/material/styles";
import { useTheme as useThemeContext } from "../contexts/ThemeContext";

/**
 * Custom hook that combines Material-UI's useTheme with our theme context
 * Provides easy access to both theme object and theme control functions
 */
export const useAppTheme = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme, setDarkMode } = useThemeContext();

  return {
    theme,
    isDarkMode,
    toggleTheme,
    setDarkMode,
    // Helper functions for common operations
    colors: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      error: theme.palette.error.main,
      warning: theme.palette.warning.main,
      info: theme.palette.info.main,
      success: theme.palette.success.main,
      text: theme.palette.text.primary,
      background: theme.palette.background.default,
      paper: theme.palette.background.paper,
      // Custom colors
      brand: theme.customColors.brand,
      status: theme.customColors.status,
      gradients: theme.customColors.gradients,
    },
    // Helper function to get contrast text color
    getContrastText: (backgroundColor) => {
      return theme.palette.getContrastText(backgroundColor);
    },
  };
};
