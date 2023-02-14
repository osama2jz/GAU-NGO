import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Muhammad Usama",
    role: "Social Worker",
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzYzNjU1NzcsImV4cCI6MTY3NjQ1MTk3N30.Qa9QNmQl0Klm-WqEkrsvkgaLnw3wY35Rt6o_b5BADK0",
  });
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
