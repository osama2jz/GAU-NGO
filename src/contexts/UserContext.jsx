import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../constants/constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  let currentLanguage = localStorage.getItem("lang") || "spanish";
  const [id, setId] = useState(
    currentLanguage === "spanish"
      ? "6429912c360576272cf4acfe"
      : "64299127360576272cf4acfc"
  );
  const [lang, setLang] = useState([]);
  const [user, setUser] = useState({
    name: userData?.name,
    firstName: "",
    lastName: "",
    id: userData?.userId,
    email: userData?.email,
    ngoId: userData?.ngoId,
    lang: currentLanguage,
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
        : userData?.userType === "admin"
        ? "Super Admin"
        : "",
    profileImage: userData?.profileImage,
    token: userData?.token,
    ngoName: userData?.ngoId?.ngoName,
    documents: [],
  });
  const value = { user, setUser, lang, translate };

  function translate(value) {
    // if (value?.split(" ").length === 1) {
    const lowerCaseValue = value?.toLowerCase();
    for (const key in lang) {
      if (key.toLowerCase() === lowerCaseValue) {
        return lang[key];
      }
    }
    return value;
    // } else {
    //   let other = "";
    //   value?.split(" ").forEach((i) => {
    //     let a = translate(i);
    //     other = other + " " + a;
    //   });
    //   return other;
    // }
  }

  //logded in user information
  const { data, status } = useQuery(
    "fetchMe",
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
          documents: response.data.documents,
        }));
      },
      enabled: !!userData?.token,
    }
  );

  //API call for fetching dictionary
  const _ = useQuery(
    ["fetchDictionary", id],
    () => {
      return axios.get(`${backendUrl + `/api/translation/list/${id}`}`);
    },
    {
      onSuccess: (response) => {
        setLang(response.data?.data);
      },
    }
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
