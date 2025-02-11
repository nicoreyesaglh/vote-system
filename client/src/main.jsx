import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { VoteProvider } from "./context/VoteContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VoteProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </VoteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
