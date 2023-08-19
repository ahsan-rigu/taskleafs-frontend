import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Contexts/AuthContext";
import DataContextProvider from "./Contexts/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
