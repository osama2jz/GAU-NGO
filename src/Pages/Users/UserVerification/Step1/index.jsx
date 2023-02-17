import { Avatar, Card, Container, Group, Text } from "@mantine/core";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Button from "../../../../Components/Button";
import { UserContext } from "../../../../contexts/UserContext";
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl } from "../../../../constants/constants";
import userImage from "../../../../assets/teacher.png";

import { useStyles } from "../styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

export const Step1 = ({ user, setUser }) => {
  const { classes } = useStyles();
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const matches = useMediaQuery("(min-width: 600px)");

  const { user: usertoken } = useContext(UserContext);
  let faceio = new faceIO("fioa89bd");

  useEffect(() => {
    faceio = new faceIO("fioa89bd");
  }, [faceio]);

  useEffect(() => {
    if (id) {
      setUser(id);
    }
  }, [id]);

  const { data: users, status } = useQuery(
    "fetchVerified",
    () => {
      return axios.get(backendUrl + "/api/ngo/listNGOUnVerifiedUsers", {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let user = {
            value: obj._id.toString(),
            label: obj?.firstName + " " + obj?.lastName,
            email: obj?.email || "",
          };
          return user;
        });
        setUserData(data);
      },
    }
  );
  
  const handleVerifyID = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          whoami: user,
          email: userData.filter((obj)=>obj.value == user)[0]?.email,
        },
      });
      console.log(`User Successfully Enrolled! Details:
      Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const SelectItem = ({ image, label, email, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image || userImage} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {email}
          </Text>
        </div>
      </Group>
    </div>
  );

  return (
    <Container>
      <Container
        size="xl"
        w={matches ? "500px" : "auto"}
        p="0px"
        className={classes.userInput}
        mt={50}
      >
        <SelectMenu
          searchable={true}
          itemComponent={SelectItem}
          placeholder="Enter User name or Id"
          clearable={true}
          setData={setUser}
          label="Search User"
          data={userData}
          value={user}
        />
      </Container>

      <Container size="xl" w={"100%"} className={classes.faceid}>
        <Button
          label={"Verify Face ID"}
          leftIcon="faceid"
          iconWidth="24px"
          styles={{ width: "500px", height: "100px", fontSize: "24px" }}
          onClick={handleVerifyID}
        />
      </Container>
    </Container>
  );
};
