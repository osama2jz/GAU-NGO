import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
  ScrollArea,
} from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/teacher.png";
import { useQuery } from "react-query";
import ReactHtmlParser from "react-html-parser";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [userdata, setUserData] = useState();
  console.log("reportData", reportData);
  const { data, status } = useQuery(
    "fetchUserbyId",
    () => {
      return axios.get(`${backendUrl + `/api/user/listSingleUser/${id}`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        setUserData(response.data.data);
      },
    }
  );
  return (
    <ScrollArea.Autosize maxHeight={500} mx="auto">
      <Container className={classes.main} justify={"space-between"}>
        <Text>{ReactHtmlParser(reportData?.content)}</Text>
      </Container>
    </ScrollArea.Autosize>
  );
}

export default ViewUserModal;
