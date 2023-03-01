import {
  Container,
  Flex,
  Grid,
  Image,
  Menu,
  SimpleGrid,
  Text,
  Avatar,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Eye, Trash } from "tabler-icons-react";
import download from "../../../assets/download.svg";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import userlogo from "../../../assets/teacher.png";
import { useStyles } from "./styles";
import ContainerHeader from "../../../Components/ContainerHeader";

function ReferalReport() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
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
      id: "time",
      numeric: false,
      disablePadding: true,
      label: "Time",
    },
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      edit: <Edit color="#4069bf" />,
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];

  const rowData = [
    {
      id: "1",
      name: "Muhammad Usama",
      case: "3452345",
      report: "1234556",
      addedBy: "Laywer",
      date: "12 Jan 2022",
      time: "12:00 PM",
    },
    {
      id: "2",
      name: "Muhammad Usama",
      case: "3452345",
      report: "1234556",
      addedBy: "Laywer",
      date: "12 Jan 2022",
      time: "12:00 PM",
    },
    {
      id: "3",
      name: "Muhammad Usama",
      case: "3452345",
      report: "1234556",
      addedBy: "Laywer",
      date: "12 Jan 2022",
      time: "12:00 PM",
    },
    {
      id: "4",
      name: "Muhammad Usama",
      case: "3452345",
      report: "1234556",
      addedBy: "Laywer",
      date: "12 Jan 2022",
      time: "12:00 PM",
    },
    {
      id: "5",
      name: "Muhammad Usama",
      case: "3452345",
      report: "1234556",
      addedBy: "Laywer",
      date: "12 Jan 2022",
      time: "12:00 PM",
    },
  ];
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
      <ContainerHeader label={"Referral"} />
      <Container size={"xl"} p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <SelectMenu
              placeholder="Added By"
              data={[
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologistng" },
                { label: "Social Worker", value: "socailworker" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <Menu shadow="md" width={"target"} className={classes.export}>
              <Menu.Target>
                <Flex gap={4} align="center" justify={"space-around"}>
                  <Image src={download} width={18} height={18} />
                  <Text>Export PDF</Text>
                </Flex>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Weekly</Menu.Item>
                <Menu.Item>Monthly</Menu.Item>
                <Menu.Item>Yearly</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>
        <Table
          headCells={headerData}
          rowData={rowData}
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
}

export default ReferalReport;
