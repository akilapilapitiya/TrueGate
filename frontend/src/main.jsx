import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";
import AuthInitializer from "./utils/AuthInitializer";

createRoot(document.getElementById("root")).render(
  <ThemeProviderWrapper>
    <Provider store={AppStore}>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </Provider>
  </ThemeProviderWrapper>
);
