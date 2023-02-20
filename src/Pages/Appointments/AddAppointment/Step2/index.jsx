import React, { useContext, useState } from "react";
import {
  SimpleGrid,
  Checkbox,
  Container,
  Flex,
  Grid,
  Text,
  Avatar,
} from "@mantine/core";
import { useStyles } from "../styles";
import { UserInfo } from "../userInformation";
import Table from "../../../../Components/Table";
import ViewModal from "../../../../Components/ViewModal/viewUser";
import { Eye } from "tabler-icons-react";
import InputField from "../../../../Components/InputField";
import userlogo from "../../../../assets/teacher.png";
import SelectMenu from "../../../../Components/SelectMenu";
import { UserContext } from "../../../../contexts/UserContext";
import axios from "axios";
import { backendUrl } from "../../../../constants/constants";
import { useQuery } from "react-query";

const Step2 = ({ selectedUser, caseNo }) => {
  const { classes } = useStyles();
  const [openViewModal, setOpenViewModal] = useState(false);
  const { user: usertoken } = useContext(UserContext);
  const [reports, setReport]=useState([])

  let headerData = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "Sr #",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "case",
      numeric: false,
      disablePadding: true,
      label: "Case #",
    },
    {
      id: "report",
      numeric: false,
      disablePadding: true,
      label: "Report #",
    },
    {
      id: "addedBy",
      numeric: false,
      disablePadding: true,
      label: "Added By",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
    },
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      numeric: false,
      label: "Actions",
    },
  ];


  const { data: users, status } = useQuery(
    "userReports",
    () => {
      return axios.get(
        backendUrl + `/api/case/listUserReports/public/${selectedUser.data.data._id}`,
        {
          headers: {
            "x-access-token": usertoken?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        console.log(response)
        let data = response.data?.data?.map((obj, ind) => {
          let report = {
            id: obj._id,
            name: obj?.caseLinkedUser,
            case: obj?.caseNo,
            addedBy: obj?.addedBy,
            date: obj?.addedDate, 
          };
          return report;
        });
        setReport(data);
      },
    }
  );

  return (
    <Container size="lg">
      <Text fz={20} fw="bolder" align="center" mb={"md"}>
        Meeting In Progress
      </Text>
      <Flex justify={"space-between"}>
        <Flex align={"center"}>
          <Text fz={18} fw={"bold"}>
            Case#
          </Text>
          <Text ml={10}>{caseNo}</Text>
        </Flex>
        <Flex align={"center"}>
          <Text fz={18} fw={"bold"}>
            Date:
          </Text>
          <Text ml={10}>XXXX</Text>
        </Flex>
      </Flex>
      <Grid mt={30}>
        <Grid.Col md={6}>
          <img
            className={classes.image}
            src="https://visualpharm.com/assets/387/Person-595b40b75ba036ed117da139.svg"
            alt="icon"
          />
        </Grid.Col>
        <Grid.Col md={4} xs={5}>
          <SimpleGrid cols={2}>
            <UserInfo userData={selectedUser} />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
      <Text align="center" fw={"bold"} mt="xl">
        User Reports
      </Text>
      <Container p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col sm={6}>
            <SelectMenu
              placeholder="Added By"
              data={[
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologistng" },
                { label: "Social Worker", value: "socailworker" },
              ]}
            />
          </Grid.Col>
        </Grid>
        <Table
          headCells={headerData}
          rowData={reports}
          setViewModalState={setOpenViewModal}
        />
      </Container>
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Report #2345"
      >
        <Grid align="center" justify={"space-between"}>
          <Grid.Col md={4}>
            <Avatar
              radius="xl"
              size={150}
              src={userlogo}
              className={classes.avatar}
            />
          </Grid.Col>
          <Grid.Col md={8} style={{ backgroundColor: "white" }}>
            <Text size={24} weight="bold" mb="sm" align="center">
              Urooj Murtaza
            </Text>
            <Container w={"100%"} ml="md">
              <SimpleGrid cols={2} spacing="xs">
                <Text className={classes.textheading}>Case # </Text>
                <Text className={classes.textContent}>23452</Text>
                <Text className={classes.textheading}>Added By</Text>
                <Text className={classes.textContent}>Lawyer</Text>
                <Text className={classes.textheading}>Date</Text>
                <Text className={classes.textContent}>20 Jan,2022</Text>
                <Text className={classes.textheading}>Time</Text>
                <Text className={classes.textContent}>11:20 PM</Text>
              </SimpleGrid>
            </Container>
          </Grid.Col>
        </Grid>
      </ViewModal>
    </Container>
  );
};

export default Step2;
