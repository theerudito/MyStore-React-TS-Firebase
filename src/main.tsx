import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.scss";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes/Router";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

store;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
