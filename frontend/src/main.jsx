import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")).render(
  <ThemeProviderWrapper>
    <Provider store={AppStore}>
      <App />
    </Provider>
  </ThemeProviderWrapper>
);
