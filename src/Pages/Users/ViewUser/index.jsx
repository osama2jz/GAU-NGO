import {
  ActionIcon,
  Anchor,
  Avatar,
  Container,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Table from "../../../Components/Table";
import TextArea from "../../../Components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";

function ViewUser() {
  const { classes } = useStyles();
  const { state } = useLocation();
  const { userData } = state ?? "";
  const { id, setId } = useState(userData);
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [docs, setDocs] = useState([]);

  const [workData, setWorkData] = useState([]);

  const _ = useQuery(
    "fetchUsertoViewData",
    () => {
      return axios.get(
        `${backendUrl + `/api/user/listSingleUser/${userData}`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        setData(response?.data?.data);

        //Work Experience
        let workData =
          response?.data?.data?.userConsentForm?.workExperience.map(
            (item, index) => {
              return {
                id: item._id,
                contract: item.contract,
                position: item.position,
                startDate: moment(item.startDate).format("YYYY-MM-DD"),
                endDate: moment(item.endDate).format("YYYY-MM-DD"),
                enterprise: item.enterprise,
                duration: item.duration,
              };
            }
          );
        setDocs(response.data.documents);
        setWorkData(workData);
      },
      enabled: !!userData,
    }
  );

  // console.log(data);
  let headerData = [
    {
      id: "fullName",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: true,
      label: "Phone",
    },
    {
      id: "center",
      numeric: false,
      disablePadding: true,
      label: "Center",
    },
    {
      id: "relation",
      numeric: false,
      disablePadding: true,
      label: "Relation",
    },
  ];
  let headerData2 = [
    {
      id: "position",
      numeric: false,
      disablePadding: true,
      label: "Position",
    },
    {
      id: "contract",
      numeric: false,
      disablePadding: true,
      label: "Job Type",
    },
    {
      id: "enterprise",
      numeric: false,
      disablePadding: true,
      label: "Enterprise",
    },
    {
      id: "duration",
      numeric: false,
      disablePadding: true,
      label: "Duration",
    },
    {
      id: "startDate",
      numeric: false,
      disablePadding: true,
      label: "Start Date",
    },
    {
      id: "endDate",
      numeric: false,
      disablePadding: true,
      label: "End Date",
    },
  ];
  let headerData3 = [
    {
      id: "educationLevel",
      numeric: false,
      disablePadding: true,
      label: "Education Level",
    },
    {
      id: "specialization",
      numeric: false,
      disablePadding: true,
      label: "Specialization",
    },
    {
      id: "complementaryTraining",
      numeric: false,
      disablePadding: true,
      label: "Complementary Training",
    },
    {
      id: "completionYear",
      numeric: false,
      disablePadding: true,
      label: "Completion Year",
    },
  ];

  return (
    <Container className={classes.addUser} size="xl" p={"0px"}>
      <ContainerHeader label={"User Detail"} />
      <Container className={classes.innerContainer} size="xl">
        <Container className={classes.inputContainer} size="xl">
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Personal Information
          </Text>
          <Flex gap={"xl"} justify="space-between">
            <Avatar
              size={180}
              radius="xl"
              // m={"0px"}
              // p={"0px"}
              src={
                data?.image || "https://www.w3schools.com/howto/img_avatar.png"
              }
            />
            <SimpleGrid
              w={"75%"}
              breakpoints={[
                { minWidth: "md", cols: 4 },
                { minWidth: "lg", cols: 4 },
                { minWidth: "xs", cols: 2 },
              ]}
              // breakpoints={[{ maxWidth: "md", cols: 2, spacing: "xl" }]}
            >
              <Text className={classes.textheading}>First Name</Text>
              <Text>
                {data?.userConsentForm?.personalInformation?.firstName}
              </Text>
              <Text className={classes.textheading}>Last Name</Text>
              <Text>
                {data?.userConsentForm?.personalInformation?.lastName}
              </Text>
              <Text className={classes.textheading}>Email</Text>
              <Text style={{ wordBreak: "break-all" }}>{data?.email}</Text>
              <Text className={classes.textheading}>Phone Number</Text>
              <Text>{data?.phoneNumber}</Text>
              <Text className={classes.textheading}>Date of Birth</Text>
              <Text>
                {data?.userConsentForm?.personalInformation?.dateOfBirth?.substring(
                  0,
                  10
                )}
              </Text>
              <Text className={classes.textheading}> Identity</Text>
              <Anchor
                href={data?.userConsentForm?.personalInformation?.documentURL}
                target={"_blank"}
              >
                <Text>
                  {data?.userConsentForm?.personalInformation?.documentType ===
                  "residentialId"
                    ? "Residential Id"
                    : data?.userConsentForm?.personalInformation
                        ?.documentType === "passport"
                    ? "Passport"
                    : "National ID"}
                </Text>
              </Anchor>
              <Text className={classes.textheading}>Country</Text>
              <Text>{data?.userConsentForm?.personalInformation?.country}</Text>
              <Text className={classes.textheading}>City</Text>
              <Text>{data?.userConsentForm?.personalInformation?.city}</Text>
              <Text className={classes.textheading}>Address</Text>
              <Text>{data?.userConsentForm?.personalInformation?.address}</Text>
            </SimpleGrid>
          </Flex>
        </Container>

        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Studies and Training
          </Text>
          <Table
            headCells={headerData3}
            rowData={data?.userConsentForm?.studiesTraining}
          />
        </Container>

        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Work Experience
          </Text>
          <Table headCells={headerData2} rowData={workData} />
        </Container>
        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Discrimination And Voilence
          </Text>
          <Text>
            {
              data?.userConsentForm?.discriminationVoilence
                ?.discriminationVoilenceValue
            }
          </Text>
        </Container>
        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Professional References
          </Text>
          <Table
            headCells={headerData}
            rowData={data?.userConsentForm?.professionalReferences}
          />
        </Container>
        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Socio-Family Situation
          </Text>
          <Text>
            {data?.userConsentForm?.socioFamilySituation?.socioFamily}
          </Text>
        </Container>
        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Economic Situation
          </Text>
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 3 },
              { minWidth: "lg", cols: 6 },
              { minWidth: "xs", cols: 2 },
            ]}
          >
            <Text fw="bold">Revenue</Text>
            <Text>{data?.userConsentForm?.economicSituation?.revenue}</Text>
            <Text fw="bold">Expenses</Text>
            <Text>{data?.userConsentForm?.economicSituation?.expenses}</Text>
            <Text fw="bold">Aids or Bonuses</Text>
            <Text>{data?.userConsentForm?.economicSituation?.aidsBonuses}</Text>
            <Text fw="bold">Debit</Text>
            <Text>{data?.userConsentForm?.economicSituation?.debt}</Text>
            <Text fw="bold">Housing</Text>
            <Text>{data?.userConsentForm?.economicSituation?.housing}</Text>
          </SimpleGrid>
        </Container>
        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Health Aspects
          </Text>
          <Text>{data?.userConsentForm?.healthAspects?.healthAspects}</Text>
        </Container>
        <Container
          className={classes.inputContainer}
          size={"xl"}
          mt="xl"
          p={"md"}
        >
          <Text
            align="center"
            fz={"lg"}
            fw="bold"
            mb="xl"
            bg={"#E9ECEF"}
            p={2.5}
          >
            Demand
          </Text>
          <Text>{data?.userConsentForm?.personalInformation?.demand}</Text>
        </Container>
        <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#E9ECEF"} p={2.5}>
          Documents
        </Text>
        <ol>
          {docs.map((obj) => {
            return (
              <li>
                <Anchor href={obj.documentURL} target="_blank" pl="md">
                  {obj.documentTitle}
                </Anchor>
              </li>
            );
          })}
        </ol>
      </Container>
    </Container>
  );
}

export default ViewUser;
