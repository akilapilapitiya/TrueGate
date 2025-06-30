import { createRoot } from "react-dom/client";
import App from "./App";


import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";
import SuccessModal from "./components/modals/SuccessModal";


createRoot(document.getElementById("root")).render(
  <Provider store={AppStore}>
    <App />

  </Provider>
);
