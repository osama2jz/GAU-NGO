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

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 640px)");

  return (
    <Flex className={classes.main} align="center" direction={"column"}>
      <Avatar
        radius="xl"
        size={150}
        src={reportData?.image || userlogo}
        className={classes.avatar}
      />
      <Text size={24} weight="bold" mb="sm" align="center" mt={"md"}>
        {reportData?.name}
      </Text>
      <Container w={!matches ? "100%" : "85%"} p={"0px"}>
        <SimpleGrid cols={2} spacing="xs">
          <Text className={classes.textheading}>Profession</Text>
          <Text className={classes.textContent}>{reportData?.userType}</Text>
          <Text className={classes.textheading}>Email</Text>
          <Text className={classes.textContent}>{reportData?.email}</Text>
          <Text className={classes.textheading}>Phone Number</Text>
          <Text className={classes.textContent}>{reportData?.phone}</Text>

          <Text className={classes.textheading}>Status</Text>

          <Badge
            variant="outline"
            color={reportData?.accStatus === "inactive" ? "red.0" : "green.0"}
            w={"100px"}
            // ml="20px"
          >
            {reportData?.accStatus}
          </Badge>
          <Text className={classes.textheading}>ID Document</Text>
          <Anchor target={"_blank"} href={reportData?.idDetails}>
            View File
          </Anchor>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default ViewUserModal;
