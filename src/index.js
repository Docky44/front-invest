import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Auth0ProviderWithHistory } from "./auth/Auth0ProviderWithHistory";
import { ProtectedApolloProvider } from "./auth/ProtectedApolloProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <ProtectedApolloProvider>
        <App />
      </ProtectedApolloProvider>
    </Auth0ProviderWithHistory>
  </React.StrictMode>
);
