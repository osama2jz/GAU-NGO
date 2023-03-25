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
            blue: [
              "#1864AB",
              "#D0EBFF",
              "#A5D8FF",
              "#74C0FC",
              "#4DABF7",
              "#339AF0",
              "#228BE6",
              "#1C7ED6",
              "#1971C2",
              "#1864AB",
            ],
            blueHover: "rgb(50, 104, 157,0.7)",
            blueSide: "rgb(50, 104, 157,0.1)",
            red: [
              "#C92A2A",
              "#FFE3E3",
              "#FFC9C9",
              "#FFA8A8",
              "#FF8787",
              "#FF6B6B",
              "#FA5252",
              "#F03E3E",
              "#E03131",
              "#C92A2A",
            ],
            redHover: "rgb(207, 30, 28, 0.7)",
            green: [
              "#2B8A3E",
              "#D3F9D8",
              "#B2F2BB",
              "#8CE99A",
              "#69DB7C",
              "#51CF66",
              "#40C057",
              "#37B24D",
              "#2F9E44",
              "#2B8A3E",
            ],
            greenHover: "rgb(15, 123, 50, 0.7)",
            black: ["#000000"],
            container: "#F5F6FA",
            heading: "#56606E",
            white: "white",
            grayDark: "rgb(0,0,0,0.5)",
          },
          primaryColor: "green",
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

            ".mantine-pimw6z": {
              color: "red",
            },
            ".mantine-Checkbox-input:checked": {
              backgroundColor: "green",
            },
            ".mantine-InputWrapper-required": {
              color: "red",
            },
            ".mantine-Modal-title": {
              margin: "auto",
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
