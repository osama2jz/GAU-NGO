import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData)
  const [user, setUser] = useState({
    name: userData?.name,
    id: userData?.userId,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    role:
      userData?.userType === "socialWorker"
        ? "Social Worker"
        : userData?.userType === "psychologist"
        ? "Psychologist"
        : "",
    profileImage: userData?.profileImage,
    token: userData?.token,
  });
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
