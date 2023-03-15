import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colors: {
            blue: ["#3268A7"],
            blueHover: "rgb(50, 104, 157,0.7)",
            blueSide: "rgb(50, 104, 157,0.1)",
            red: ["rgb(207, 30, 28)"],
            redHover: "rgb(207, 30, 28, 0.7)",
            green: ["rgb(15, 123, 50)"],
            greenHover: "rgb(15, 123, 50, 0.7)",
            black: ["#000000"],
            container: "#F5F6FA",
            gray: "#E7E7E780",
            heading: "#56606E",
            white: "white",
            grayDark: "rgb(0,0,0,0.5)",
          },
          primaryColor: "cyan",
          globalStyles: (theme) => ({
            ".mantine-Radio-radio": {
              border: `1px solid gray`,
            },
            ".mantine-Radio-inner": {
              backgroundColor: "red.0",
              color: "yellow",
            },
            ".mantine-19tsm68": {
              color: "red",
            },
            
            ".mantine-pimw6z":{
              color:'red'
            },
            ".mantine-Checkbox-input:checked": {
                backgroundColor: "green",
            },
            ".mantine-InputWrapper-required":{
              color:'red'
            },
            ".mantine-Modal-title":{
              margin:'auto',
            },
            ".mantine-Select-item": {
              "&[data-hovered]": {
                backgroundColor: theme.colors.blueHover,
              },
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor: theme.colors.blue,
                  color: theme.colors.white,
                },
              },
            },
          }),
        }}
      >
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <App />
          </UserProvider>
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
