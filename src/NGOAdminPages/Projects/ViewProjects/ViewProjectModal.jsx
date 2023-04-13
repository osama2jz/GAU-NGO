import { Badge, Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);

  return (
    <Container w={"100%"} ml="md">
      <SimpleGrid cols={2} spacing="xs">
        <Text className={classes.textheading}>{translate("Project Name")} </Text>
        <Text className={classes.textContent}>{reportData?.projectName}</Text>
        <Text className={classes.textheading}>{translate("Created Date")} </Text>
        <Text className={classes.textContent}>{reportData?.createdDate}</Text>

        <Text className={classes.textheading}>{translate("Status")}</Text>

        <Badge
          variant="filled"
          color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
          w={"100px"}
        >
          {reportData?.accStatus}
        </Badge>
        <Text className={classes.textheading}>
          {translate("Description")}
        </Text>
        <Text>{reportData?.description}</Text>
      </SimpleGrid>
    </Container>
  );
}

export default ViewUserModal;
