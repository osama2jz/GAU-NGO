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
            blue: ["#3268A7"],
            blueHover: 'rgb(50, 104, 157,0.1)',
            red: ["rgb(207, 30, 28)"],
            redHover: 'rgb(207, 30, 28, 0.7)',
            green: ['rgb(15, 123, 50)'],
            greenHover:'rgb(15, 123, 50, 0.7)',
            white: 'white',
            black: "#000000",
            container: '#F5F6FA',
            gray: "#E7E7E780",
            heading: "#56606E",
            grayDark: "rgb(0,0,0,0.5)",
          },
          globalStyles: (theme) => ({
            ".mantine-Radio-radio": {
                border:`1px solid gray`
            },
          }),
        }}
      >
        <UserProvider>
          <App />
        </UserProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
