import { Container, Flex, Grid, Text, Image, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import calender from "../../../assets/calendar.png";
import ViewAppointment from "./ViewAppointment";
import { texts } from "../AddAppointment/userInformation";
import ViewModal from "../../Users/AllUsers/viewUser";
import ContainerHeader from "../../../Components/ContainerHeader";

function AllAppointments() {
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
   id: "case",
   numeric: true,
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
   id: "status",
   numeric: false,
   disablePadding: true,
   label: "Appointment Status",
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
   numeric: false,
   label: "Actions",
  },
 ];
 const rowData = [
  {
   id: "1",
   case: "1234556",
   name: "Muhammad Usama",
   email: "osama@gmail.com",
   date: "12 Jan 2022",
   status: "Processing",
   accStatus: "Active",
  },
  {
   id: "2",
   case: "1234556",
   name: "Muhammad UUsama",
   email: "osama@gmail.com",
   date: "12 Jan 2022",
   status: "Processing",
   accStatus: "Active",
  },
  {
   id: "3",
   case: "1234556",
   name: "Muhammad Usama",
   email: "osama@gmail.com",
   date: "12 Jan 2022",
   status: "Processing",
   accStatus: "Active",
  },
  {
   id: "4",
   case: "1234556",
   name: "Muhammad Usama",
   email: "osama@gmail.com",
   date: "12 Jan 2022",
   status: "Processing",
   accStatus: "Active",
  },
  {
   id: "5",
   case: "1234556",
   name: "Muhammad Usama",
   email: "osama@gmail.com",
   date: "12 Jan 2022",
   status: "Processing",
   accStatus: "Active",
  },
 ];
 return (
  <Container className={classes.addUser} size="xl">
   <Flex align="center" justify="center" gap={12} className={classes.heading}>
    {/* <Image src={calender} width={30} height={32} /> */}
    {/* <Text fz={32} fw={600} align="center">
     All Appointments
    </Text> */}
    <ContainerHeader label={"All Appointments"} />
   </Flex>
   <Container p={"xs"} className={classes.innerContainer}>
    <Grid align={"center"} py="md">
     <Grid.Col sm={6}>
      <InputField placeholder="Search" leftIcon="search" pb="0" />
     </Grid.Col>
     <Grid.Col sm={6} md={3}>
      <SelectMenu
       placeholder="Filter by Status"
       data={[
        { label: "verified", value: "verified" },
        { label: "Pending", value: "pending" },
       ]}
      />
     </Grid.Col>
     <Grid.Col sm={3} ml="auto">
      <Button
       label={"Add Appointment"}
       primary={true}
       leftIcon={"plus"}
       styles={{ float: "right" }}
       onClick={() => navigate(routeNames.socialWorker.addAppoinment)}
      />
     </Grid.Col>
    </Grid>
    <Table headCells={headerData} rowData={rowData} setViewModalState={setOpenViewModal} />
   </Container>

   {/* <ViewAppointment opened={openViewModal} setOpened={setOpenViewModal} /> */}
   <ViewModal title={"Appointment# XXXX"} opened={openViewModal} setOpened={setOpenViewModal}>
    <SimpleGrid p={10} cols={2}>
     {texts}
    </SimpleGrid>
   </ViewModal>
  </Container>
 );
}

export default AllAppointments;
