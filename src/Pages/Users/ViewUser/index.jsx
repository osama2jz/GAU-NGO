import {
  Avatar,
  Container,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@mantine/core";
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
        <Container size="xl">
          <Container className={classes.inputContainer} size="xl">
            <Text align="center" fw="bold" mb="md">
              Personal Information
            </Text>
            <Flex gap={"xl"} justify="space-between">
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
              <SimpleGrid
                w={"70%"}
                breakpoints={[
                  { minWidth: "md", cols: 4 },
                  { minWidth: "lg", cols: 4 },
                  { minWidth: "xs", cols: 2 },
                ]}
                // breakpoints={[{ maxWidth: "md", cols: 2, spacing: "xl" }]}
              >
                <Text>First Name</Text>
                <Text>Muhammad</Text>
                <Text>Last Name</Text>
                <Text>Abduallah</Text>
                <Text>Email</Text>
                <Text style={{wordBreak:"break-all"}}>abdullah@gmail.com</Text>
                <Text>Phone Number</Text>
                <Text>+34382947328</Text>
                <Text>First Name</Text>
                <Text>Muhammad</Text>
                <Text>Last Name</Text>
                <Text>Abduallah</Text>
                <Text>Email</Text>
                <Text>abdullah@gmail.com</Text>
                <Text>Phone Number</Text>
                <Text>+34382947328</Text>
              </SimpleGrid>
            </Flex>
          </Container>
          <Divider />
          <Container className={classes.inputContainer}>
            <Text align="center">Personal Information</Text>
          </Container>
          <Divider />
          <Container className={classes.inputContainer}>
            <Text align="center">Personal Information</Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default ViewUser;
