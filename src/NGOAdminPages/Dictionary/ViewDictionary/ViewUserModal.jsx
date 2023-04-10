import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
  Flex,
} from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/salary.png";
import { useQuery } from "react-query";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const {user}=useContext(UserContext)

  return (
    <>
      <Flex direction={"column"}  align="center" justify={"space-between"}>
       
          {/* <Avatar
            radius="sm"
            size={130}
            src={userlogo}
            className={classes.avatar}
          /> */}
       
       
          
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2}>
              {user.role === "admin" && (
                <>
                <Text className={classes.textheading}>Person Donated </Text>
                <Text className={classes.textContent}>
                {reportData?.name}
              </Text></>
                
              )}
            
              <Text className={classes.textheading}>Amount Donated </Text>
              <Text className={classes.textContent}>{reportData?.amount}</Text>
              <Text className={classes.textheading}>Donation Date</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
            
              <Text className={classes.textheading}>NGO Name</Text>
              <Text className={classes.textContent}>{reportData?.ngo}</Text>
            </SimpleGrid>
          </Container>
          
          
      </Flex>
      <Text mt="md" className={classes.textheading}>Description</Text>
              <Text className={classes.textContent}>
                {reportData?.description
                  ? reportData?.description
                  : "No Description"}
              </Text>
    </>
  );
}

export default ViewUserModal;
