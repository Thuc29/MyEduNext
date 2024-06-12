import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/react-fontawesome";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@fortawesome/free-solid-svg-icons";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="644239042299-d40f738qdvc2a19pl18qr4jsu5sa9n8h.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
