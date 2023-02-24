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
import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import userImage from "../../../../assets/teacher.png";
import InputField from "../../../../Components/InputField";
import Loader from "../../../../Components/Loader";
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import { UserInfo } from "../userInformation";

const Step1 = ({ setSelectedUser, setSelectedCase, newCase, setNewCase }) => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const { user: usertoken } = useContext(UserContext);
  const [user, setUser] = useState("");
  const [cases, setCases] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    queryClient.invalidateQueries("userFetched");
    queryClient.invalidateQueries("casesFetched");
  }, [user]);
  //all users
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

  //selected user
  const { data: selectedUser, status: userFetching } = useQuery(
    ["userFetched", user],
    () => {
      console.log(user);
      return axios.get(backendUrl + `/api/user/listSingleUser/${user}`, {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      cacheTime: 0,
      onSuccess: (response) => {
        setSelectedUser(response);
      },
      enabled: !!user,
    }
  );

  //user cases
  const { data: casesData, status: casesfetching } = useQuery(
    ["casesFetched", user],
    () => {
      return axios.get(backendUrl + `/api/case/listUserCases/${user}`, {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let casee = {
            value: obj._id,
            label: obj?.caseName,
          };
          return casee;
        });
        setCases(data);
      },
      enabled: !!user,
    }
  );

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
    <Container>
      <Text fz={20} fw="bolder" align="center">
        Select User
      </Text>
      <SimpleGrid
        breakpoints={[
          { minWidth: "md", cols: 1 },
          {
            minWidth: "lg",
            cols: selectedUser || selectedUser === "loading" ? 2 : 1,
          },
          { minWidth: "xs", cols: 1 },
        ]}
      >
        <SimpleGrid align={"flex-end"}>
          <SelectMenu
            searchable={true}
            itemComponent={SelectItem}
            placeholder="Enter User name or Id"
            clearable={true}
            setData={setUser}
            // value={selectedUser?.data?.data?._id}
            value={user}
            label="Search User"
            data={userData}
          />
          {casesfetching !== "loading" && (
            <SelectMenu
              searchable={true}
              placeholder="Enter case name or id"
              label="Search User Case"
              creatable={true}
              setData={setSelectedCase}
              disabled={newCase.length > 0}
              data={cases}
              onChange={(v) => setUser(v)}
            />
          )}
          <Divider
            label="OR"
            labelPosition="center"
            color={"black.0"}
            m="0px"
            p={"0px"}
          />
          <InputField
            label={"Create New Case"}
            placeholder="Enter case name"
            value={newCase}
            pb="0px"
            onChange={(v) => {
              setNewCase(v.target.value);
              setSelectedCase(v.target.value);
            }}
          />
        </SimpleGrid>
        {selectedUser === "loading" ? (
          <Loader />
        ) : selectedUser ? (
          <Grid mt={30}>
            <Grid.Col md={5}>
              <img className={classes.image} src={userImage} alt="img" />
            </Grid.Col>
            <Grid.Col md={6} xs={5}>
              <SimpleGrid cols={2}>
                <UserInfo userData={selectedUser} loading={userFetching} />
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        ) : (
          ""
        )}
      </SimpleGrid>
    </Container>
  );
};

export default Step1;
