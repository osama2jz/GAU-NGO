import { Avatar, Container, Group,Text } from "@mantine/core";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Button from "../../../../Components/Button";
import { UserContext } from "../../../../contexts/UserContext";
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl } from "../../../../constants/constants";
import userImage from "../../../../assets/teacher.png";

import { useStyles } from "../styles";
import axios from "axios";

export const Step1 = ({user,setUser}) => {
  const { classes } = useStyles();
  const [userData, setUserData] = useState([]);
 
  const { user: usertoken } = useContext(UserContext);
  let faceio;

  useEffect(() => {
    faceio = new faceIO("fioae1c0");
    console.log("asdad", faceio);
  }, []);

  const { data: users, status } = useQuery(
    "fetchVerified",
    () => {
      return axios.get(backendUrl + "/api/ngo/listNGOVerifiedUsers", {
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
          email: "example@gmail.com",
          pin: "12345",
        },
      });

      console.log(` Unique Facial ID: ${response.facialId}
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
    <Container size="xl" w={"100%"} className={classes.faceid}>
      <SelectMenu
        searchable={true}
        itemComponent={SelectItem}
        placeholder="Enter User name or Id"
        clearable={true}
        setData={setUser}
        label="Search User"
        data={userData}
      />
      <Button
        label={"Verify Face ID"}
        leftIcon="faceid"
        iconWidth="24px"
        styles={{ width: "500px", height: "100px", fontSize:'24px'}}
        onClick={handleVerifyID}
      />
    </Container>
  );
};
