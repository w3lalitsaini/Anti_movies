import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async"; // 1. Import this
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Wrap your App here */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
