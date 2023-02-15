import { useState } from "react";
import userlogo from "../../../assets/teacher.png";
import ViewModal from "../../../Components/ViewModal/viewUser";
import {
  Anchor,
  Container,
  SimpleGrid,
  Avatar,
  Flex,
  Grid,
  Text,
  Badge
} from "@mantine/core";
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

const UserPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  let headerData = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
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
      label: "Registration Date",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "User Status",
    },
    {
      id: "accStatus",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      edit: <Edit color="#4069bf" />,
      delete: <Trash color="red" />,
      verify: <Checks color="#4069bf" />,
      numeric: false,
      label: "Actions",
    },
  ];
  const rowData = [
    {
      id: "1",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      status: "Processing",
      accStatus: "Active",
    },
    {
      id: "2",
      name: "Muhammad UUsama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      status: "Processing",
      accStatus: "Active",
    },
    {
      id: "3",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      status: "Processing",
      accStatus: "Active",
    },
    {
      id: "4",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      status: "Processing",
      accStatus: "Active",
    },
    {
      id: "5",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      status: "Processing",
      accStatus: "Active",
    },
  ];
  const a = [
    {
      title: "ALL USERS",
      value: 100,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "Users",
      //   link: routeNames.socialWorker.userPageDashboard,
    },
    {
      title: "VERIFIED",
      value: 200,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "Users",
      //   link: routeNames.socialWorker.appointmentPageDashboard,
    },
    {
      title: "UNVERIFIED",
      value: 150,
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
          User
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
        title="User Details"
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
