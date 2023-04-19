import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
  Anchor,
  Flex,
} from "@mantine/core";
import { useStyles } from "./styles";

import userlogo from "../../../assets/teacher.png";

import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const matches = useMediaQuery("(min-width: 640px)");

  return (
    <Flex className={classes.main} align="center" direction={"column"}>
      <Avatar
        radius="xl"
        size={150}
        src={reportData?.image || userlogo}
        className={classes.avatar}
      />

      <Container w={!matches ? "100%" : "85%"} p={"0px"}>
        <SimpleGrid cols={2} spacing="xs" mt={"md"}>
          <Text className={classes.textheading}>{translate("Name")}</Text>
          <Text className={classes.textContent}>{reportData?.name}</Text>
          <Text className={classes.textheading}>{translate("Profession")}</Text>
          <Text className={classes.textContent}>{reportData?.userType}</Text>
          <Text className={classes.textheading}>{translate("Email")}</Text>
          <Text className={classes.textContent}>{reportData?.email}</Text>
          <Text className={classes.textheading}>{translate("Phone Number")}</Text>
          <Text className={classes.textContent}>{reportData?.phone}</Text>

          <Text className={classes.textheading}>{translate("Status")}</Text>

          <Badge
            variant="outline"
            color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
            w={"100px"}
            // ml="20px"
          >
            {reportData?.accStatus}
          </Badge>
          <Text className={classes.textheading}>{translate("ID Document")}</Text>
          <Anchor target={"_blank"} href={reportData?.idDetails}>
            {translate("View File")}
          </Anchor>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default ViewUserModal;
