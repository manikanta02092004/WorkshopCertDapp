import React from "react";
import ReactDOM from "react-dom/client";
import { MetaMaskProvider } from "@metamask/sdk-react";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "WISH Learnings",
          url: window.location.host,
        },
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
