import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
<Auth0Provider
    domain="dev-plkzq8vze86lmomj.us.auth0.com"
    clientId="UvTs6w8auaHmZmwrWWEgMjXrpX2cnLDX"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <App />
  </Auth0Provider>,
     document.getElementById("root")
     );

