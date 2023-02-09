import {useState} from "react";
import { Anchor, Container, Flex, Grid, Text } from "@mantine/core";
import {useStyles} from "./styles";
import Card from "../Card";
import Table from "../../../Components/Table";
import { ArrowNarrowLeft, Checks, Edit, Eye, Plus, Trash } from "tabler-icons-react";
import { useNavigate } from "react-router";

const UserPage=(props)=> {
    const { classes} = useStyles();
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
          title: "ALL APPOINTMENTS",
          value: 100,
          progress: 78,
          color: "#748FFC",
          progressTitle: "Response Rate",
          icon: "Users",
        //   link: routeNames.socialWorker.userPageDashboard,
        },
        {
          title: "PENDING",
          value: 200,
          progress: 78,
          color: "#A9E34B",
          progressTitle: "Response Rate",
          icon: "Users",
        //   link: routeNames.socialWorker.appointmentPageDashboard,
        },
        {
          title: "COMPLETED",
          value: 150,
          progress: 78,
          color: "#087F5B",
          progressTitle: "Response Rate",
          icon: "Users",
        //   link: routeNames.socialWorker.reportPageDashboard,
        },
      ];

    return (
        <Container className={classes.main}>
        <Flex justify="center" align="center" mb="md">
        <Anchor fz={12} fw="bolder" className={classes.back} onClick={() => navigate(-1)}>
          <ArrowNarrowLeft />
          <Text>Back</Text>
        </Anchor>
        <Text fz={28} fw="bolder" mb="sm" mr="auto" >
            Appointment
        </Text>
      </Flex>
           <Grid>
          {a.map((item, index) => (
            <Grid.Col md={"auto"} >
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
        
        </Container>
    )
}
export default UserPage;
