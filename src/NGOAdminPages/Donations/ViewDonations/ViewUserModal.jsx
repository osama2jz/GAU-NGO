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
  const { user, translate } = useContext(UserContext);
  console.log(reportData);

  return (
    <>
      <Flex direction={"column"} align="center" justify={"space-between"}>
        <Avatar
          radius="sm"
          size={130}
          src={reportData?.image || userlogo }
          className={classes.avatar}
        />

        <Container w={"100%"} ml="md">
          <SimpleGrid cols={2} mt={"md"}>
            {user.role === "Admin" && (
              <>
                <Text className={classes.textheading}>
                  {translate("User Donated")}{" "}
                </Text>
                <Text className={classes.textContent}>{reportData?.name}</Text>
              </>
            )}

            <Text className={classes.textheading}>
              {translate("Amount Donated")}
            </Text>
            <Text className={classes.textContent}>{reportData?.amount}</Text>
            <Text className={classes.textheading}>
              {translate("Donation Date")}
            </Text>
            <Text className={classes.textContent}>{reportData?.date}</Text>

            <Text className={classes.textheading}>{translate("NGO Name")}</Text>
            <Text className={classes.textContent}>{reportData?.ngo}</Text>
            <Text className={classes.textheading}>
              {translate("Description")}
            </Text>
            <Text className={classes.textContent}>
              {reportData?.description
                ? reportData?.description
                : translate("No Description")}
            </Text>
          </SimpleGrid>
        </Container>
      </Flex>
    </>
  );
}

export default ViewUserModal;
