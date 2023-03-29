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
function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 640px)");

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
          <Text className={classes.textheading}>Branch Name </Text>
          <Text className={classes.textContent}>{reportData?.name}</Text>
          <Text className={classes.textheading}>Branch Email </Text>
          <Text className={classes.textContent}>{reportData?.branchEmail}</Text>
          <Text className={classes.textheading}>Point of Contact </Text>
          <Text className={classes.textContent}>
            {reportData?.branchPointOfContact}
          </Text>
          <Text className={classes.textheading}>Contact Number </Text>
          <Text className={classes.textContent}>
            {reportData?.branchContact}
          </Text>
          <Text className={classes.textheading}>Start Time</Text>
          <Text>{reportData?.branchStartTime}</Text>
          <Text className={classes.textheading}>End Time</Text>
          <Text>{reportData?.branchEndTime}</Text>
          <Text className={classes.textheading}>Branch Status</Text>
          <Badge
            variant="filled"
            color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
            w={"100px"}
          >
            {reportData?.accStatus}
          </Badge>
          <Text className={classes.textheading}>Branch Address </Text>
          <Text className={classes.textContent}>{reportData?.location}</Text>
          <Text className={classes.textheading}>Branch Description</Text>
          <Text>
            {reportData?.description
              ? reportData?.description
              : "No Description"}
          </Text>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default ViewUserModal;
