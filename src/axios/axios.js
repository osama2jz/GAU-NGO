import axios from "axios";
import {backendUrl} from "../constants/constants"

export const axiosGet = async ({ url, params, headers, withSNo }) => {
  let response;
  try {
    response = await axios.get(backendUrl + url, {
      ...params,
      headers: {
        //   Authorization: `Bearer ${userData?.token}`,
        ...headers,
      },
    });
  } catch (err) {
    // response = err.response;
  }
  if (response.data && withSNo) {
    console.log("Before", response.data.data);
    response.data.data = response.data.data.map((item, index) => {
      return { ...item, sNo: index + 1 };
    });
    console.log("After", response.data.data);
  }
  return response;
};

export const axiosPost = async ({ url, data, params, headers }) => {
  let response;
  try {
    response = await axios.post(backendUrl + url, data, {
      ...params,
      // form data
      headers: {
        "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzYyNjk1OTYsImV4cCI6MTY3NjM1NTk5Nn0.UpP_uPhShXq3E0DzgFvAZpOIXNrCY1P-Mjj1oNJE8p8",
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
