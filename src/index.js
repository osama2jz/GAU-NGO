import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{ colors: { primary: '#1D203E'}, primaryColor:'blue' }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
