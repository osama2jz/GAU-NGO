import { Grid, Avatar, SimpleGrid, Container, Text } from "@mantine/core";
import { useStyles } from "./styles";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import userlogo from "../../../assets/teacher.png";
import { useQuery } from "react-query";

function ViewUserModal({ id }) {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [userdata, setUserData] = useState();

  console.log(userdata);
    useEffect(()=>{
        getData(id)
    })
    const getData=async(id)=>{
    await axios.get(
        `${backendUrl + `/api/user/listSingleUser/${id}`}`,
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
      <Grid.Col md={7} style={{ backgroundColor: "white" }}>
        <Text size={24} weight="bold" mb="sm" align="center">
          {userdata?.firstName}
          {""} {userdata?.lastName}
        </Text>
        <Container w={"100%"}>
          <SimpleGrid cols={2} spacing="xs">
            <Text className={classes.textheading}>Date of Birth</Text>
            <Text className={classes.textContent}>Date of Birth</Text>
            <Text className={classes.textheading}>Age</Text>
            <Text className={classes.textContent}>{userdata?.userConsentForm?.personalInformation?.age}</Text>
            <Text className={classes.textheading}>Nationality</Text>
            <Text className={classes.textContent}>{userdata?.userConsentForm?.personalInformation?.nationality}</Text>
            <Text className={classes.textheading}>Origin</Text>
            <Text className={classes.textContent}>{userdata?.userConsentForm?.personalInformation?.origin}</Text>
            <Text className={classes.textheading}>Passport</Text>
            <Text className={classes.textContent}>
              {userdata?.userConsentForm?.personalInformation?.passport}
            </Text>
            <Text className={classes.textheading}>Domicile</Text>
            <Text className={classes.textContent}> {userdata?.userConsentForm?.personalInformation?.domicile}</Text>
            <Text className={classes.textheading}>Municipality</Text>
            <Text className={classes.textContent}> {userdata?.userConsentForm?.personalInformation?.muncipality}</Text>
          </SimpleGrid>
        </Container>
      </Grid.Col>
    </Grid>
  );
}

export default ViewUserModal;
