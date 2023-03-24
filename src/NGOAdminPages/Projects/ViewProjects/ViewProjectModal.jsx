import { Badge, Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();

  return (
    <>
      <Flex direction="column" align="center" justify={"space-between"}>
        <Container w={"100%"} ml="md">
          <SimpleGrid cols={2} spacing="xs">
            <Text className={classes.textheading}>Project Name </Text>
            <Text className={classes.textContent}>
              {reportData?.projectName}
            </Text>
            <Text className={classes.textheading}>Created Date </Text>
            <Text className={classes.textContent}>
              {reportData?.createdDate}
            </Text>

            <Text className={classes.textheading}>Status</Text>

            <Badge
              variant="outline"
              color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
              w={"100px"}
            >
              {reportData?.accStatus}
            </Badge>
          </SimpleGrid>
        </Container>
      </Flex>
      <Text className={classes.textheading} mt="md">
        Description
      </Text>
      <Text>{reportData?.description}</Text>
    </>
  );
}

export default ViewUserModal;
