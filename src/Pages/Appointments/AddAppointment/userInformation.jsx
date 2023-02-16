import { Text } from "@mantine/core";
import moment from "moment/moment";
import { useEffect, useState } from "react";

export const UserInfo = ({ userData, loading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        key: "Full Name",
        value:
          userData?.data?.data?.firstName +
          " " +
          userData?.data?.data?.lastName,
      },
      {
        key: "Passport",
        value:
          userData?.data?.data?.userConsentForm?.personalInformation?.passport,
      },
      {
        key: "Nationality",
        value:
          userData?.data?.data?.userConsentForm?.personalInformation
            ?.nationality,
      },
      {
        key: "Origin",
        value:
          userData?.data?.data?.userConsentForm?.personalInformation?.origin,
      },
      {
        key: "Age",
        value: userData?.data?.data?.userConsentForm?.personalInformation?.age,
      },
    ]);
  }, [userData]);

  return data.map((obj) => {
    return (
      <>
        <Text fz={16} fw={"bold"}>
          {obj.key}
        </Text>
        <Text opacity={"40%"} fz={16} fw={"bold"}>
          {obj.value}
        </Text>
      </>
    );
  });
};
