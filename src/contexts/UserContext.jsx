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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWRjNTU4OTliNWJiMDAxNDhkNjY1MiIsInVzZXJUeXBlIjoic29jaWFsV29ya2VyIiwiaWF0IjoxNjc2NzE5NTAyLCJleHAiOjE2NzY4MDU5MDJ9.ggz4tcvWSgPfqLvMRaYHUKAaArPcFSn-LY2jJdWcqFw",
    // token: userData?.token,
  });
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
