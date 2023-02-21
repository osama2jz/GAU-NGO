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
import { useContext, useState } from "react";
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
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import { useQuery } from "react-query";
import moment from "moment";
import axios from "axios";

function PrivateReport() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  let headerData = [
    {
      id: "sr",
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
      id: "caseNo",
      numeric: false,
      disablePadding: true,
      label: "Case #",
    },
    // {
    //   id: "report",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Report #",
    // },
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
      id: "type",
      numeric: false,
      disablePadding: true,
      label: "Report Type",
    },
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching Private Reports
  const { data, status } = useQuery(
    "fetchAppointments",
    () => {
      return axios.get(
        `${backendUrl + `/api/case/listUserReports/private/${user.id}`}`, 
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let appointment = {
            id: obj.reportId,
            sr: ind + 1,
            caseNo: obj.caseNo,
            name: obj.caseLinkedUser,
            addedBy: obj.addedBy,
            type:obj.reportType,
            date: new moment(obj.addedDate).format("DD-MMM-YYYY"),
          };
          return appointment;
        });
        setRowData(data);
        console.log("response", response);
        
      },
    }
  );
  return (
    <Container size={"xl"} className={classes.main}>
      <ContainerHeader label={"Private"} />
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
            <Menu shadow="md" width={"target"} className={classes.export} >
              <Menu.Target>
                <Flex gap={4} align="center" justify={"space-around"}>
                  <Image src={download} width={18} height={18} />
                  <Text>Export PDF</Text>
                </Flex>
              </Menu.Target>
              <Menu.Dropdown >
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

export default PrivateReport;
