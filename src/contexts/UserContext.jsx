import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../constants/constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({
    name: userData?.name,
    firstName: "",
    lastName: "",
    id: userData?.userId,
    email: userData?.email,
    ngoId: userData?.ngoId,
    phoneNumber: userData?.phoneNumber,
    role:
      userData?.userType === "socialWorker"
        ? "Social Worker"
        : userData?.userType === "psychologist"
        ? "Psychologist"
        : userData?.userType === "lawyer"
        ? "Lawyer"
        : userData?.userType === "ngoadmin"
        ? "Admin"
        : userData?.userType === "user"
        ? "User"
        : "",
    profileImage: userData?.profileImage,
    token: userData?.token,
  });
  const value = { user, setUser };

  const { data, status } = useQuery(
    "fetchUserSingle",
    () => {
      return axios.get(
        `${backendUrl + `/api/user/listSingleUser/${userData?.userId}`}`,
        {
          headers: {
            "x-access-token": userData?.token,
          },
        }
      );
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        let user = response.data.data;
        setUser((u) => ({
          ...u,
          ngoId: user?.ngoId,
          firstName: user?.firstName,
          lastName: user?.lastName,
          name: user?.firstName + " " + user?.lastName,
          phoneNumber: user?.phoneNumber,
          profileImage: user?.profileImage,
        }));
      },
      enabled: !!userData?.token,
    }
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
