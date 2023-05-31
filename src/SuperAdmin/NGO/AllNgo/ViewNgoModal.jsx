import {
  Avatar,
  Badge,
  Container,
  Flex,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 640px)");
  const { translate } = useContext(UserContext);


  return (
    <Flex direction={"column"} align="center" >
      <Avatar
        radius="sm"
        size={150}
        src={reportData?.image}
        className={classes.avatar}
      />
      <Container w={!matches ? "100%" : "95%"} p={"0px"} pt="md">
        <SimpleGrid cols={2} spacing="xs" w={"100%"}>
          <Text className={classes.textheading}>{translate("Branch Name")} </Text>
          <Text className={classes.textContent}>{reportData?.name}</Text>
          <Text className={classes.textheading}>{translate("Branch Email")} </Text>
          <Text className={classes.textContent}>{reportData?.branchEmail}</Text>
          <Text className={classes.textheading}>{translate("Point of Contact")} </Text>
          <Text className={classes.textContent}>
            {reportData?.branchPointOfContact}
          </Text>
          <Text className={classes.textheading}>{translate("Contact Number")} </Text>
          <Text className={classes.textContent}>
            {reportData?.branchContact}
          </Text>
          <Text className={classes.textheading}>{translate("Start Time")}</Text>
          <Text>{reportData?.branchStartTime}</Text>
          <Text className={classes.textheading}>{translate("End Time")}</Text>
          <Text>{reportData?.branchEndTime}</Text>
          <Text className={classes.textheading}>{translate("Branch Status")}</Text>
          <Badge
            variant="filled"
            color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
            w={"100px"}
          >
            {translate(reportData?.accStatus)}
          </Badge>
          <Text className={classes.textheading}>{translate("Branch Address")} </Text>
          <Text className={classes.textContent}>{reportData?.location}</Text>
          <Text className={classes.textheading}>{translate("Branch Description")}</Text>
          <Text>
            {reportData?.description
              ? reportData?.description
              : translate("No Description")}
          </Text>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default ViewUserModal;
