import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Muhammad Usama",
    role: "Social Worker",
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    token:
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzY0NDA2MzcsImV4cCI6MTY3NjUyNzAzN30.U-11ck0aUvy4HV1sbeNgCsaYu6QAFs-2dCIYBY38hbA",
  });
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
