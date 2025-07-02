import { createRoot } from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";


createRoot(document.getElementById("root")).render(
  <div className="main-container">
    <CssBaseline />
    <App />
  </div>
  

  
);
