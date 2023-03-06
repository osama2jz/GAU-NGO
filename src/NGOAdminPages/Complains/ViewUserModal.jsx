import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
} from "@mantine/core";
import { useStyles } from "./styles";

import userlogo from "../../assets/salary.png";
import { useQuery } from "react-query";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();

  return (
    <>
      <Grid align="center" justify={"space-between"}>
        <Grid.Col md={4}>
          <Avatar
            radius="sm"
            size={130}
            src={userlogo}
            className={classes.avatar}
          />
        </Grid.Col>
        <Grid.Col md={8} style={{ backgroundColor: "white" }}>
          <Text size={24} weight="bold" mb="sm" align="center">
            {reportData?.name}
          </Text>
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2}>
              <Text className={classes.textheading}>Amount Donated </Text>
              <Text className={classes.textContent}>{reportData?.amount}</Text>
              <Text className={classes.textheading}>Donation Date</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>Description</Text>
              <Text className={classes.textContent}>
                {reportData?.description
                  ? reportData?.description
                  : "No Description"}
              </Text>
              <Text className={classes.textheading}>NGO Name</Text>
              <Text className={classes.textContent}>{reportData?.ngo}</Text>
            </SimpleGrid>
          </Container>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewUserModal;
