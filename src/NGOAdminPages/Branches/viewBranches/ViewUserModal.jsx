import { Grid, Avatar, SimpleGrid, Container, Text,Badge } from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/teacher.png";
import { useQuery } from "react-query";

function ViewUserModal({ id,reportData }) {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [userdata, setUserData] = useState();
 
  return (
    <Grid className={classes.main} align="center" justify={"space-between"}>
      <Grid.Col md={4} className={classes.main}>
        <Avatar
          radius="xl"
          size={150}
          src={userlogo}
          className={classes.avatar}
        />
      </Grid.Col>
      <Grid.Col md={7} style={{ backgroundColor: "white" }}>
        <Text size={24} weight="bold" mb="sm" align="center">
          {reportData?.name}
        </Text>
        <Container w={"100%"}>
          <SimpleGrid cols={2} spacing="xs">
           
            <Text className={classes.textheading}>Address</Text>
            <Text className={classes.textContent}>
              {reportData?.location}
            </Text>
            <Text className={classes.textheading}>Description</Text>
            <Text className={classes.textContent}>
              {reportData?.phone}
            </Text>
           
            
            <Text className={classes.textheading}>Status</Text>
           <Badge  color={reportData?.accStatus=== "inactive" ? "red" :"green"}>{reportData?.accStatus}</Badge>
            <Text className={classes.textheading}>User Status</Text>
            
            <Badge color={reportData?.status=== "unverified" ? "red" :"green"} radius="md">{reportData?.status}</Badge>
            
            
          </SimpleGrid>
        </Container>
      </Grid.Col>
    </Grid>
  );
}

export default ViewUserModal;
