import { Avatar, Container, Flex, Grid, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";
import ContainerHeader from "../../../Components/ContainerHeader";
import { useStyles } from "./styles";

function ViewUser() {
  const { classes } = useStyles();
  const { state } = useLocation();
  const { userData } = state ?? "";

  console.log(userData);

  return (
    <Container className={classes.addUser} size="xl" p={"0px"}>
      <ContainerHeader label={"User Detail"} />
      <Container className={classes.innerContainer} size="xl">
        <Container>
          <Container className={classes.inputContainer}>
            <Text>Personal Information</Text>
            <Flex gap={"xl"} direction={"row"}>
            <div>
                <Avatar
                  size={150}
                  radius="xl"
                  m={"0px"}
                  p={"0px"}
                  src={
                    userData?.image ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
              </div>
              <SimpleGrid cols={6} breakpoints={[{ maxWidth: 'md', cols: 2, spacing: 'xl' }]}>
              <div>First Name</div>
              <div>Sara</div>
              <div>Last Name</div>
              <div>Khan</div>
              <div>First Name</div>
              <div>Sara</div>
              <div>Last Name</div>
              <div>Khan</div>
              
              
            </SimpleGrid>
            </Flex>
           

            
          </Container>
          <Container className={classes.inputContainer}>
            <Text>Personal Information</Text>
          </Container>
          <Container className={classes.inputContainer}>
            <Text>Personal Information</Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default ViewUser;
