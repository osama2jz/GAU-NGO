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
import { useQuery } from "react-query";
import InputField from "../../../../Components/InputField";
import Loader from "../../../../Components/Loader";
import userImage from "../../../../assets/teacher.png";
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import { UserInfo } from "../userInformation";
import Button from "../../../../Components/Button";
import { useParams } from "react-router-dom";

const Step1 = ({ setSelectedUser, setSelectedCase, newCase, setNewCase }) => {
  const { classes } = useStyles();
  const { user: usertoken } = useContext(UserContext);
  const [user, setUser] = useState();
  const [faceID, setFaceId] = useState({});
  const [cases, setCases] = useState([]);
  const [userData, setUserData] = useState([]);
  const { id, appId } = useParams();
  // setUser(id);
  // console.log("id",id)

  let faceio = new faceIO("fioa89bd");

  useEffect(() => {
    if (id) {
      setUser(id);
    }
  }, [id]);

  useEffect(() => {
    faceio = new faceIO("fioa89bd");
  }, [faceio]);

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
      return axios.get(backendUrl + `/api/user/listSingleUser/${user}`, {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },

    {
      onSuccess: (response) => {
        // setCases([]),
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

  const handleVerifyID = async () => {
    try {
      faceio
        .authenticate({
          locale: "auto", // Default user locale
        })
        .then((userData) => {
          setFaceId(userData.payload);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Flex gap={"md"} direction="column" px={"0px"}>
      <Text fz={20} fw="bolder" align="center">
        Verify User
      </Text>

      <Button
        label={"Verify Face ID"}
        bg={true}
        leftIcon="faceid"
        iconWidth="30px"
        styles={{
          width: "220px",
          fontSize: "24px",
          height: "46px",
          margin: "auto",
        }}
        onClick={handleVerifyID}
      />

      {userFetching === "loading" ? (
        <Loader />
      ) : selectedUser ? (
        <Container size={"lg"} p="0px">
          <UserInfo userData={selectedUser} loading={userFetching} />
        </Container>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default Step1;
