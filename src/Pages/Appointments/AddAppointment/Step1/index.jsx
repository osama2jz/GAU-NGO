import {
  Avatar,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import InputField from "../../../../Components/InputField";
import Loader from "../../../../Components/Loader";
import userImage from "../../../../assets/teacher.png"
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import { texts } from "../userInformation";

const Step1 = () => {
  const { classes } = useStyles();
  const { user: usertoken } = useContext(UserContext);
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);

  const data = [
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Bender Bending Rodríguez",
      value: "Bender Bending Rodríguez",
      description: "Fascinated with cooking",
    },

    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Carol Miller",
      value: "Carol Miller",
      description: "One of the richest people on Earth",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      label: "Homer Simpson",
      value: "Homer Simpson",
      description: "Overweight, lazy, and often ignorant",
    },
    {
      image:
        "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
      label: "Spongebob Squarepants",
      value: "Spongebob Squarepants",
      description: "Not just a sponge",
    },
  ];

  const { data: users, status } = useQuery(
    "fetchVerified",
    () => {
      return axios.get(backendUrl + "/api/ngo/listNGOVerifiedUsers", {
        headers: {
          "x-access-token": usertoken.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let user = {
            value: obj._id.toString(),
            label: obj.firstName + " " + obj.lastName,
            email: obj?.email || "email"
          };
          return user;
        });
        setUserData(data);
      },
    }
  );
  console.log("dads", userData);
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

  if (status === "loading") {
    return <Loader />;
  }
  return (
    <Flex gap={"md"} direction="column" px={"md"}>
      <Text fz={20} fw="bolder" align="center">
        Select User
      </Text>
      <SelectMenu
        searchable={true}
        itemComponent={SelectItem}
        placeholder="Enter User name or Id"
        clearable={true}
        setData={setUser}
        label="Search User"
        data={userData}
      />
      <Grid align={"center"}>
        <Grid.Col md={"5"}>
          <SelectMenu
            searchable={true}
            placeholder="Enter case name or id"
            label="Search User Case"
            creatable={true}
            data={[
              { label: "verified", value: "Personal" },
              { label: "Pending", value: "Wealth" },
              { label: "Pending", value: "Divorce" },
            ]}
          />
        </Grid.Col>
        <Grid.Col md="2">
          <Divider label="OR" labelPosition="center" color={"black"} mt="lg" />
        </Grid.Col>
        <Grid.Col md="5">
          <InputField
            label={"Create New Case"}
            placeholder="Enter case name"
            pb="0px"
          />
        </Grid.Col>
      </Grid>

      {user && (
        <Grid mt={30}>
          <Grid.Col md={6}>
            <img
              className={classes.image}
              src="https://visualpharm.com/assets/387/Person-595b40b75ba036ed117da139.svg"
              alt="img"
            />
          </Grid.Col>
          <Grid.Col md={4} xs={5}>
            <SimpleGrid cols={2}>{texts}</SimpleGrid>
          </Grid.Col>
        </Grid>
      )}
    </Flex>
  );
};

export default Step1;
