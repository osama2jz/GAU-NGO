import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
  Image,
  Flex,
} from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/teacher.png";
import { useQuery } from "react-query";
import { useMediaQuery } from "@mantine/hooks";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);
  const [userdata, setUserData] = useState();
  const matches = useMediaQuery("(min-width: 640px)");
  const { data, status } = useQuery(
    "fetchUserbyId",
    () => {
      return axios.get(`${backendUrl + `/api/user/listSingleUser/${id}`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        setUserData(response.data.data);
      },
    }
  );
  return (
    <Flex align="center" direction="column">
      <Avatar
        radius="50%"
        size={150}
        src={reportData?.image}
        className={classes.avatar}
      />
      <Container w={!matches ? "100%" : "85%"} p={"0px"} mt="md">
        <SimpleGrid cols={2} spacing="xs" w={"100%"}>
          <Text className={classes.textheading}>{translate("Name")}</Text>
          <Text className={classes.textContent}>{reportData?.name}</Text>
          <Text className={classes.textheading}>{translate("Email")}</Text>
          <Text className={classes.textContent}>{reportData?.email}</Text>
          <Text className={classes.textheading}>
            {translate("Phone Number")}
          </Text>
          <Text className={classes.textContent}>{reportData?.phone}</Text>
          <Text className={classes.textheading}>{translate("Status")}</Text>
          <Badge
            variant="outline"
            color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
            w={"150px"}
            ml="20px"
          >
            {translate(reportData?.accStatus)}
          </Badge>
          <Text className={classes.textheading}>
            {translate("User Status")}
          </Text>
          <Badge
            variant="outline"
            color={reportData?.status === "unverified" ? "red.0" : "green.0"}
            radius="md"
            ml="20px"
            w={"150px"}
          >
            {translate(reportData?.status)}
          </Badge>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default ViewUserModal;
