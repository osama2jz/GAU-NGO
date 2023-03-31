import {
    Anchor,
  Avatar,
  Container,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";
import ContainerHeader from "../../../Components/ContainerHeader";
import Table from "../../../Components/Table";
import TextArea from "../../../Components/TextArea";
import { useStyles } from "./styles";

function ViewUser() {
  const { classes } = useStyles();
  const { state } = useLocation();
  const { userData } = state ?? "";

  console.log(userData);
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
        <Container size="xl">
          <Container className={classes.inputContainer} size="xl">
            <Text align="center" fz={"lg"}fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>
              Personal Information
            </Text>
            <Flex gap={"xl"} justify="space-between" >
              <Avatar
                size={180}
                radius="xl"
                // m={"0px"}
                // p={"0px"}
                src={
                  userData?.image ||
                  "https://www.w3schools.com/howto/img_avatar.png"
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
                <Text>First Name</Text>
                <Text>{userData?.consentform?.personalInformation?.firstName}</Text>
                <Text>Last Name</Text>
                <Text>{userData?.consentform?.personalInformation?.lastName}</Text>
                <Text>Email</Text>
                <Text style={{wordBreak:"break-all"}}>{userData?.email}</Text>
                <Text>Phone Number</Text>
                <Text>{userData?.phone}</Text>
                <Text>Date of Birth</Text>
                <Text>{(userData?.consentform?.personalInformation?.dateOfBirth)?.substring(0,10)}</Text>
                <Text>Identity</Text>
                <Anchor href={userData?.consentform?.personalInformation?.documentURL} target={"_blank"}>
                <Text>{userData?.consentform?.personalInformation?.documentType==="residentialId"?"Residential Id":userData?.consentform?.personalInformation?.documentType==="passport"?"Passport" :"National ID"}</Text>

                </Anchor>
                <Text>Country</Text>
                <Text>{userData?.consentform?.personalInformation?.country}</Text>
                <Text>City</Text>
                <Text>{userData?.consentform?.personalInformation?.city}</Text>
                <Text>Address</Text>
                <Text>{userData?.consentform?.personalInformation?.address}</Text>
                
              </SimpleGrid>
            </Flex>
          </Container>
          
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Studies and Training</Text>
            <Table
            headCells={headerData3}
            rowData={userData?.consentform?.studiesTraining}
            
          />
          </Container>
          
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Work Experience</Text>
            <Table
            headCells={headerData2}
            rowData={userData?.consentform?.workExperience}
            
          />
          </Container>
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Discrimination And Voilence</Text>
           
          </Container>
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Professional References</Text>
            <Table
            headCells={headerData}
            rowData={userData?.consentform?.professionalReferences}
            
          />
          </Container>
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Socio-Family Situation</Text>
           
          </Container>
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Economic Situation</Text>
           
          </Container>
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Health Aspects</Text>
           
          </Container>
          <Container className={classes.inputContainer} size={"xl"} mt="xl" p={"md"}>
            <Text align="center" fz={"lg"} fw="bold" mb="xl" bg={"#CED4DA"} p={2.5}>Demand</Text>
            <TextArea
             
            />

            
           
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default ViewUser;
