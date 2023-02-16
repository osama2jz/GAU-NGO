import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({
    name: userData?.name,
    role:
      userData?.userType === "socialWorker"
        ? "Social Worker"
        : userData?.userType === "psychologist"
        ? "Psychologist"
        : "",
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzY1MzA3MDksImV4cCI6MTY3NjYxNzEwOX0.6qQ0yPc2dFFnAHXG_s7kd0rKFS7RgFXQcr2DN1ED5YY",
    // token: userData?.token,
  });
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
