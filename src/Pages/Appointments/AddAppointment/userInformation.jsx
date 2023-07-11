import { Card, Container, Flex, Group, Text } from "@mantine/core";
import userImage from "../../../assets/teacher.png";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const UserInfo = ({ userData, loading }) => {
  const matches = useMediaQuery("(min-width: 640px)");
  const [data, setData] = useState([]);
  const { user, translate } = useContext(UserContext);

  useEffect(() => {
    setData([
      {
        key: "Name",
        value:
          userData?.data?.data?.firstName +
          " " +
          userData?.data?.data?.lastName,
      },
      {
        key: "Email",
        value: userData?.data?.data?.email,
      },
      {
        key: "Phone No.",
        value: userData?.data?.data?.phoneNumber,
      },
      {
        key: "Country",
        value:
          userData?.data?.data?.userConsentForm?.personalInformation?.country,
      },
      {
        key: "Age",
        value: userData?.data?.data?.userConsentForm?.personalInformation?.age,
      },
    ]);
  }, [userData]);

  return (
    <Card
      shadow="lg"
      radius={"lg"}
      px={"0px"}
      w={"95%"}
      style={{
        display: "flex",
        // height:"300px",
        flexDirection: matches ? "row" : "column",
        // alignItems: "center",
        border: "1px solid rgb(0,0,0,0.1)",
      }}
    >
      <img
        width={"180px"}
        src={userData?.data?.data?.profileImage || userImage}
        alt="img"
      />
      <Container w="100%">
        {data.map((obj) => {
          return (
            <Flex justify={"space-between"} w={"%"} mb="sm" gap={"10px"}>
              <Text fz={matches ? 16 : 12} fw={"bold"}>
                {translate(obj.key)}
              </Text>
              <Text
                opacity={"40%"}
                fz={matches ? 16 : 12}
                fw={"bold"}
                ml="20px"
                style={{ wordBreak: "break-all" }}
              >
                {obj.value}
              </Text>
            </Flex>
          );
        })}
      </Container>
    </Card>
  );
};
