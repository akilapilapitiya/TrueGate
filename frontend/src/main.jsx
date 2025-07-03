import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";

createRoot(document.getElementById("root")).render(
  <Provider store={AppStore}>
    <CssBaseline />
    <App />
  </Provider>
);
