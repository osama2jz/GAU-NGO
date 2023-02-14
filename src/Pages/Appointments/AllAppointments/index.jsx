import { Container, Flex, Grid, Text, Image, SimpleGrid,Badge,Avatar } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewModal from "../../../Components/ViewModal/viewUser";
import ContainerHeader from "../../../Components/ContainerHeader";
import userlogo from "../../../assets/teacher.png";


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
   name: "Muhammad Usama",
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
    <ContainerHeader label={"View Appointments"} />
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

   <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Appointment #2345"
        size="560px"
      >
         
        <Grid  align="center" justify={"space-between"}>
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
                     <Badge color="red" ml="auto">Processing</Badge>
                </Text>
              </SimpleGrid>
            </Container>
          </Grid.Col>
        </Grid>
       
      </ViewModal>
 
  </Container>
 );
}

export default AllAppointments;
