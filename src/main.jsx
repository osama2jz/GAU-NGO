import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "./contexts/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <React.StrictMode>
  <BrowserRouter>
   <MantineProvider
    theme={{
     colors: {
      primary: "#1D203E",
      primaryHover: "rgba(29, 32, 62, 0.8)",
      background: "#E7E7E780",
      container: "white",
      gray: "#E7E7E780",
      heading: "#56606E",
      grayDark: "rgb(0,0,0,0.5)",
     },
     primaryColor: "blue",
    }}>
    <UserProvider>
     <App />
    </UserProvider>
   </MantineProvider>
  </BrowserRouter>
 </React.StrictMode>
);

