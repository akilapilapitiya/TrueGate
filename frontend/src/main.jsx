import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";
//import { getTheme, lightColors  } from "./ColorTheme.jsx";


createRoot(document.getElementById("root")).render(
  <Provider store={AppStore}>
    <CssBaseline />
    <App />
  </Provider>
);
