import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
} from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/ngob.png";
import { useQuery } from "react-query";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [userdata, setUserData] = useState();

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
              <Text className={classes.textheading}>Branch Address </Text>
              <Text className={classes.textContent}>
                {reportData?.location}
              </Text>
              <Text className={classes.textheading}>Branch Status</Text>
              <Badge
                variant="outline"
                color={
                  reportData?.accStatus === "inactive" ? "red.0" : "green.0"
                }
              >
                {reportData?.accStatus}
              </Badge>
              
            </SimpleGrid>
          </Container>
        </Grid.Col>
      </Grid>
      <Container w={"100%"} mt={"md"}>
      <Text className={classes.textheading}>Branch Description</Text>
      <Text>{reportData?.description ? reportData?.description :"No Description"}</Text>
        </Container>
      
    </>
  );
}

export default ViewUserModal;
