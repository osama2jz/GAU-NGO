import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Muhammad Usama",
    role: "Social Worker",
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    token:
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzY0NTMzMzUsImV4cCI6MTY3NjUzOTczNX0.vD8FW172nZ885ApbFADcaOGHgxuLjjG0WIwhhmiY8Ks",
  });
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
