import { useState } from "react";
import { Anchor, Container,SimpleGrid, Avatar,Flex, Grid, Text } from "@mantine/core";
import userlogo from "../../../assets/teacher.png";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { useStyles } from "./styles";
import Card from "../Card";
import Table from "../../../Components/Table";
import { ArrowNarrowLeft, Checks, Edit, Eye, Plus, Trash } from "tabler-icons-react";
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
      view: <Eye color="#4069BF" />,
      edit: <Edit color="#4069BF" />,
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
  const a = [
    {
      title: "PUBLIC ",
      value: 100,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "Users",
      //   link: routeNames.socialWorker.userPageDashboard,
    },
    {
      title: "PRIVATE ",
      value: 200,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "Users",
      //   link: routeNames.socialWorker.appointmentPageDashboard,
    },
    {
      title: "REFERAL ",
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
        <Anchor fz={12} fw="bolder" className={classes.back} onClick={() => navigate(-1)}>
          <ArrowNarrowLeft />
          <Text>Back</Text>
        </Anchor>
        <Text fz={28} fw="bolder" mb="sm" mr="auto" >
        Report
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
export default UserPage;
