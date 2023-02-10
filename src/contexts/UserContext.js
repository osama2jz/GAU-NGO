import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
 const [user, setUser] = useState({
  name: "Muhammad Usama",
  role: "Social Worker",
  img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
 });
 const value = { user, setUser };
 return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
