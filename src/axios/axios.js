import axios from "axios";
import { backendUrl } from "../constants/constants";

export const axiosGet = async ({ key, url, params, headers }) => {
  const { data, status } = await useQuery(key, () => {
    return axios.get(`${backendUrl + url}`, {
      ...params,
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzYyNjk1OTYsImV4cCI6MTY3NjM1NTk5Nn0.UpP_uPhShXq3E0DzgFvAZpOIXNrCY1P-Mjj1oNJE8p8",
        //   Authorization: `Bearer ${userData?.token}`,
        ...headers,
      },
    });
  });
  // response = await axios.get(backendUrl + url, {
  //   ...params,
  //   headers: {
  //     "x-access-token":
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzYyNjk1OTYsImV4cCI6MTY3NjM1NTk5Nn0.UpP_uPhShXq3E0DzgFvAZpOIXNrCY1P-Mjj1oNJE8p8",
  //     //   Authorization: `Bearer ${userData?.token}`,
  //     ...headers,
  //   },
  // });
  return { data, status };
};

export const axiosPost = async ({ url, data, params, headers }) => {
  let response;
  try {
    response = await axios.post(backendUrl + url, data, {
      ...params,
      // form data
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzYyNjk1OTYsImV4cCI6MTY3NjM1NTk5Nn0.UpP_uPhShXq3E0DzgFvAZpOIXNrCY1P-Mjj1oNJE8p8",
        // contentType: "multipart/form-data",

        // withCredentials: true,
        // Authorization: `Bearer ${userData?.token}`,
        ...headers,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
