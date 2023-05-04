import { Card, Container, Flex, Group, Text } from "@mantine/core";
import userImage from "../../../assets/teacher.png";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const UserInfo = ({ userData, loading }) => {
  const matches = useMediaQuery("(min-width: 640px)");
  const [data, setData] = useState([]);
  const {user, translate} =useContext(UserContext)


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
      style={{
        display: "flex",
        // height:"300px",
        flexDirection: matches ? "row" : "column",
        alignItems: "center",
        border: "1px solid rgb(0,0,0,0.1)",
      }}
    >
      <img width={"180px"} src={userData?.data?.data?.profileImage || userImage} alt="img" />
      <Container w="100%">
        {data.map((obj) => {
          return (
            <Flex justify={"space-between"} w={"100%"} mb="sm" gap={"20px"}>
              <Text fz={16} fw={"bold"}>
              {translate(obj.key)}
              </Text>
              <Text opacity={"40%"} fz={16} fw={"bold"} ml="20px">
                {obj.value}
              </Text>
            </Flex>
          );
        })}
      </Container>
    </Card>
  );
};
