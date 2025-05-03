import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import "./index.css";
import App from "./App";
import { store } from "./store/store";
import WsMessageAndCookies from "./store/WsMessageAndCookies";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <CookiesProvider defaultSetOptions={{ path: "/" }}>
    <ReduxProvider store={store}>
      <WsMessageAndCookies>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WsMessageAndCookies>
    </ReduxProvider>
  </CookiesProvider>
  // </React.StrictMode>
);
