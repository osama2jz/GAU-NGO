import {
 Avatar,
 Container,
 Flex,
 Grid,
 Group,
 Image,
 Select,
 SimpleGrid,
 Text,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Checks, Edit, Eye, Plus, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import user from "../../../assets/user.png";
import { useStyles } from "./styles";
import ViewModal from "./viewUser";

export const AllUser = () => {
 const { classes } = useStyles();
 const navigate = useNavigate();
 const [openDeleteModal, setOpenDeleteModal] = useState(false);
 const [openViewModal, setOpenViewModal] = useState(false);
 const [openEditModal, setOpenEditModal] = useState(false);
 const texts = [
  "Full Name",
  "Passport",
  "Date of Birth",
  "Nationality",
  "Origin",
  "Age",
  "Domicile",
  "Municipality",
 ].map((e, i) => {
  return (
   <>
    <Text fz={16} fw={"bold"}>
     {e}
    </Text>
    <Text opacity={"40%"} fz={16} fw={"bold"}>
     {e}
    </Text>
   </>
  );
 });

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
   image:
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
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
    <Image src={user} width={30} height={32} />
    <Text fz={32} fw={600} align="center">
     View Users
    </Text>
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
       label={"Add User"}
       primary={true}
       leftIcon={"plus"}
       styles={{ float: "right" }}
       onClick={() => navigate(routeNames.socialWorker.addUser)}
      />
     </Grid.Col>
    </Grid>
    <Table
     headCells={headerData}
     rowData={rowData}
     setViewModalState={setOpenViewModal}
     setEditModalState={setOpenEditModal}
     setDeleteModalState={setOpenDeleteModal}
    />
   </Container>
   <DeleteModal
    opened={openDeleteModal}
    setOpened={setOpenDeleteModal}
    onCancel={() => setOpenDeleteModal(false)}
    onDelete={() => setOpenDeleteModal(false)}
    label="Are you Sure?"
    message="Do you really want to delete these records? This process cannot be undone."
   />
   <ViewModal opened={openViewModal} setOpened={setOpenViewModal} title="User Details">
    <Container>
     <Group pt={"sm"} ml={"auto"}>
      {/* <Button label="Cancel" compact={true} /> */}
      <Avatar
       radius="xl"
       size="xl"
       src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
      />
      <SimpleGrid ml={50} spacing cols={2}>
       {texts}
      </SimpleGrid>
      {/* <Button label="Verify" primary={true} compact={true} /> */}
     </Group>
    </Container>
   </ViewModal>
  </Container>
 );
};
