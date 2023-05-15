import {
  Avatar,
  Container,
  Divider,
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
import { backendUrl, s3Config } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { UserInfo } from "../userInformation";

const Step1 = ({
  setSelectedUser,
  setSelectedCase,
  newCase,
  setNewCase,
  setProjectId,
  projectId,
}) => {
  const queryClient = useQueryClient();
  const { user: usertoken, translate } = useContext(UserContext);
  const [user, setUser] = useState("");
  const [cases, setCases] = useState([]);
  const [projects, setProjetcs] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    queryClient.invalidateQueries("userFetched");
    queryClient.invalidateQueries("casesFetched");
  }, [user]);

  useEffect(() => {
    if (usertoken.role === "User") {
      setUser(usertoken.id);
    }
  }, [usertoken]);

  // //all users
  // const { data: users, status } = useQuery(
  //   "fetchVerified",
  //   () => {
  //     return axios.get(backendUrl + "/api/ngo/listNGOUsers/user/0/0/verified", {
  //       headers: {
  //         "x-access-token": usertoken?.token,
  //       },
  //     });
  //   },
  //   {
  //     onSuccess: (response) => {
  //       let data = response.data.data.map((obj, ind) => {
  //         if (obj.userStatus === "active") {
  //           let user = {
  //             value: obj._id.toString(),
  //             label: obj?.firstName + " " + obj?.lastName,
  //             email: obj?.email || "",
  //             image: obj?.profileImage,
  //           };
  //           return user;
  //         }
  //       });
  //       let newData = data.filter((item) => item !== undefined);
  //       setUserData(newData);
  //     },
  //   }
  // );

   //all users
   const { data: usersa, status2 } = useQuery(
    "fetchUsers",
    () => {
      return axios.get(backendUrl + "/api/user/verificationScheduledUsers/none", {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        console.log("response",response)
        let data = response.data.data.map((obj, ind) => {
          if (obj.userStatus === "active") {
            let user = {
              value: obj._id.toString(),
              label: obj?.firstName + " " + obj?.lastName,
              email: obj?.email || "",
              image: obj?.profileImage,
            };
            return user;
          }
        });
        let newData = data.filter((item) => item !== undefined);
        setUserData(newData);
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
      cacheTime: 0,
      onSuccess: (response) => {
        setSelectedUser(response);
      },
      enabled: !!user,
    }
  );

  //user cases
  const { data: casesData, status: casesfetching } = useQuery(
    ["casesFetched", user, projectId],
    () => {
      return axios.get(
        backendUrl + `/api/case/listUserCases/${user}/${projectId}`,
        {
          headers: {
            "x-access-token": usertoken?.token,
          },
        }
      );
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
      enabled: !!user && !!projectId,
    }
  );

  const SelectItem = ({ image, label, email, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image}>{label.split(" ")[1][0]}</Avatar>

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
    <Container p={"0px"} size="xl">
      <Text fz={20} fw="bolder" align="center">
        {usertoken.role === "User" ? translate("Personal Information") : translate("Select User")}
      </Text>
      <Container>
        <Container w="36rem">
          <SelectMenu
            searchable={true}
            itemComponent={SelectItem}
            placeholder="Enter User name or Id"
            clearable={true}
            setData={setUser}
            value={user}
            label="Search User"
            data={userData}
          />
        </Container>
        {userFetching === "loading" ? (
          <Container mt={"xl"}>
            <Loader minHeight="40px" />
          </Container>
        ) : selectedUser ? (
          <Container mt={"md"} w={"36rem"} >
            <UserInfo userData={selectedUser} loading={userFetching} />
          </Container>
        ) : (
          ""
        )}
      </Container>
    </Container>
  );
};

export default Step1;
