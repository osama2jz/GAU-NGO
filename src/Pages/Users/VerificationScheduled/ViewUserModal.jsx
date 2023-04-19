import { Grid, Avatar, SimpleGrid, Container, Text,Badge } from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/teacher.png";
import { useQuery } from "react-query";

function ViewUserModal({ id }) {
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);
  const [userdata, setUserData] = useState();

    useEffect(()=>{
        getData()
    })
    const getData=async(id)=>{
    await axios.get(
        // `${backendUrl + `/api/user/listSingleUser/${id}`}`,
         `${backendUrl + `/api/user/listSingleUser/63e9d8587e54ce0014de43b3`}`,
        {
          headers: {
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYTRiNDM1ZjVkMGVlMGNhOTA0ZSIsInVzZXJUeXBlIjoibmdvYWRtaW4iLCJpYXQiOjE2NzY0NDA2MzcsImV4cCI6MTY3NjUyNzAzN30.U-11ck0aUvy4HV1sbeNgCsaYu6QAFs-2dCIYBY38hbA",
          },
        }
      )
        .then((res)=>{
            setUserData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
//   const { data, status } = useQuery(
//     "fetchUserbyId",
//     () => {
//       return axios.get(`${backendUrl + `/api/user/listSingleUser/${id}`}`, {
//         headers: {
//           "x-access-token": user.token,
//         },
//       });
//     },
//     {
//       onSuccess: (response) => {
//         // setRowData(response.data.data);
//         setUserData(response.data.data);
//         console.log("data", response.data.data);
//       },
//     }
//   );
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
    <Grid.Col md={8} style={{ backgroundColor: "white" }}>
      <Text size={24} weight="bold" mb="sm" align="center">
       {userdata?.firstName}{""} {userdata?.lastName}
      </Text>
      <Container w={"100%"} ml="md">
        <SimpleGrid cols={2} spacing="xs">
          <Text className={classes.textheading}>{translate("Email")}</Text>
          <Text className={classes.textContent}>{userdata?.email}</Text>
          <Text className={classes.textheading}>{translate("Appointment Date")}</Text>
          <Text className={classes.textContent}>12 Jan 2020</Text>
          <Text className={classes.textheading}>{("Appointment Time")}</Text>
          <Text className={classes.textContent}>11:30 PM</Text>
          <Text className={classes.textheading}>{translate("Status")}</Text>
          <Text className={classes.textContent}>
            <Badge color="red" ml="auto">
              {translate("Processing")}
            </Badge>
          </Text>
        </SimpleGrid>
      </Container>
    </Grid.Col>
  </Grid>
  );
}

export default ViewUserModal;
