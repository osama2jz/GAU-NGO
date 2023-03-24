import {
  Avatar,
  Badge,
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./styles";
function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 640px)");

  return (
    <>
      <Flex direction={"column"} align="center">
        <Avatar
          radius="sm"
          size={150}
          src={reportData?.image}
          className={classes.avatar}
        />

        <Text size={24} weight="bold" mb="sm" align="center" mt={"md"}>
          {reportData?.name}
        </Text>
        <Container w={!matches ? "100%" : "85%"} p={"0px"}>
          <SimpleGrid cols={2} spacing="xs" w={"100%"}>
            <Text className={classes.textheading}>Branch Email </Text>
            <Text className={classes.textContent}>
              {reportData?.branchEmail}
            </Text>
            <Text className={classes.textheading}>Point of Contact </Text>
            <Text className={classes.textContent}>
              {reportData?.branchPointOfContact}
            </Text>
            <Text className={classes.textheading}>Contact Number </Text>
            <Text className={classes.textContent}>
              {reportData?.branchContact}
            </Text>
            <Text className={classes.textheading}>Branch Address </Text>
            <Text className={classes.textContent}>{reportData?.location}</Text>
            <Text className={classes.textheading}>Branch Status</Text>
            <Badge
              variant="outline"
              color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
              w={"100px"}
              // ml="20px"
            >
              {reportData?.accStatus}
            </Badge>
          </SimpleGrid>
        </Container>
      </Flex>
      <Container w={"100%"} mt={"md"}>
        <Text className={classes.textheading}>Branch Description</Text>
        <Text>
          {reportData?.description ? reportData?.description : "No Description"}
        </Text>
      </Container>
    </>
  );
}

export default ViewUserModal;
