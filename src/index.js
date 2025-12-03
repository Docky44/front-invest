import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Auth0ProviderWithHistory } from "./auth/Auth0ProviderWithHistory";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </React.StrictMode>
);
