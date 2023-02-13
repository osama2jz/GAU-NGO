import {
  Container,
  Flex,
  Grid,
  Image,
  Menu,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Eye, Trash } from "tabler-icons-react";
import download from "../../../assets/download.svg";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import { texts } from "../../Appointments/AddAppointment/userInformation";
import ViewModal from "../../Users/AllUsers/viewUser";
import ViewReport from "../viewReport";
import { useStyles } from "./styles";

function PrivateReport() {
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
    <Container className={classes.main}>
      <Flex
        align="center"
        justify="center"
        gap={12}
        className={classes.heading}
      >
        <Text fz={32} fw={600} align="center">
          Private
        </Text>
      </Flex>
      <Container p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <SelectMenu
              pb="0px"
              placeholder="Added By"
              data={[
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologistng" },
                { label: "Social Worker", value: "socailworker" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <Menu shadow="md" width={"auto"} className={classes.export}>
              <Menu.Target>
                <Flex gap={6}>
                  <Image src={download} width={18} height={18} />
                  <Text>Export</Text>
                </Flex>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Download Options</Menu.Label>
                <Menu.Item>Download as PDF</Menu.Item>
                <Menu.Item>Download as CSV</Menu.Item>
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
        title={"Appointment# XXXX"}
        opened={openViewModal}
        setOpened={setOpenViewModal}
      >
        <SimpleGrid p={10} cols={2}>
          {texts}
        </SimpleGrid>
      </ViewModal>
      {/* <ViewReport opened={openViewModal} setOpened={setOpenViewModal} /> */}
    </Container>
  );
}

export default PrivateReport;
