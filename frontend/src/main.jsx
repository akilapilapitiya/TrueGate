import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";
import { theme } from "./utils/ColorTheme";


createRoot(document.getElementById("root")).render(
  <Provider store={AppStore}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    </ThemeProvider>
  </Provider>
);
