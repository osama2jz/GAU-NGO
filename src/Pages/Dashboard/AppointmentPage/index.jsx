import { useContext, useState } from "react";
import {
  Anchor,
  Container,
  Flex,
  SimpleGrid,
  Grid,
  Badge,
  Avatar,
  Text,
} from "@mantine/core";
import ViewModal from "../../../Components/ViewModal/viewUser";
import userlogo from "../../../assets/teacher.png";
import { useStyles } from "./styles";
import Card from "../Card";
import Table from "../../../Components/Table";
import {
  ArrowNarrowLeft,
  Checks,
  Edit,
  Eye,
  Plus,
  Trash,
} from "tabler-icons-react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import { useQuery } from "react-query";
import moment from "moment";
import axios from "axios";

const UserPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { user } = useContext(UserContext);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //API call for fetching All Scheduled Appointments
  const { data, status } = useQuery(
    "fetchAppointments",
    () => {
      return axios.get(
        `${backendUrl + `/api/case/listUserCaseAppointments/${user.id}/${activePage}/10`}`,

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
            id: obj._id,
            sr: ind + 1,
            caseName: obj.caseName,
            caseNo: obj.caseNo,
            name: obj.caseLinkedUser.firstName + " " + obj.caseLinkedUser.lastName,
            email: obj.caseLinkedUser.email,
            status: obj.caseStatus,
            time: new moment(obj.createdAt).format("hh:mm A"),
            date: new moment(obj.createdDate).format("DD-MMM-YYYY"),
          };
          return appointment;
        });
        setRowData(data);
        
      },
    }
  );
  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
    },
   
    {
      id: "caseName",
      numeric: false,
      disablePadding: true,
      label: "Case Name",
    },
    {
      id: "caseNo",
      numeric: false,
      disablePadding: true,
      label: "Case No.",
    },
    {
      id: "name",
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
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      numeric: false,
      label: "Actions",
    },
  ];
  const a = [
    {
      title: "ALL APPOINTMENTS",
      value: 120,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "Users",
      //   link: routeNames.socialWorker.userPageDashboard,
    },
    {
      title: "PENDING",
      value: 43,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "Users",
      //   link: routeNames.socialWorker.appointmentPageDashboard,
    },
    {
      title: "COMPLETED",
      value: 77,
      progress: 78,
      color: "#087F5B",
      progressTitle: "Response Rate",
      icon: "Users",
      //   link: routeNames.socialWorker.reportPageDashboard,
    },
  ];

  return (
    <Container className={classes.main} size="lg">
      <Flex justify="center" align="center" mb="md">
        <Anchor
          fz={12}
          fw="bolder"
          className={classes.back}
          onClick={() => navigate(-1)}
        >
          <ArrowNarrowLeft />
          <Text>Back</Text>
        </Anchor>
        <Text fz={28} fw="bolder" mb="sm" mr="auto">
          Appointment
        </Text>
      </Flex>
      <Grid>
        {a.map((item, index) => (
          <Grid.Col md={"auto"}>
            <Card data={item} />
          </Grid.Col>
        ))}
      </Grid>
      <Container mt="md" className={classes.main}>
        <Table
          headCells={headerData}
          rowData={rowData}
          setViewModalState={setOpenViewModal}
          setEditModalState={setOpenEditModal}
          setDeleteModalState={setOpenDeleteModal}
        />
      </Container>
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Appointment #2345"
        size="490px"
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
                <Text className={classes.textheading}>Email</Text>
                <Text className={classes.textContent}>urooj@gmail.com</Text>
                <Text className={classes.textheading}>Appointment Date</Text>
                <Text className={classes.textContent}>12 Jan 2020</Text>
                <Text className={classes.textheading}>Appointment Time</Text>
                <Text className={classes.textContent}>11:20 PM</Text>
                <Text className={classes.textheading}>Status</Text>
                <Text className={classes.textContent}>
                  <Badge color="red" ml="auto">
                    Processing
                  </Badge>
                </Text>
              </SimpleGrid>
            </Container>
          </Grid.Col>
        </Grid>
      </ViewModal>
    </Container>
  );
};
export default UserPage;
