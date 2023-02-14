import {
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Divider,
  Avatar,
  SimpleGrid,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Checks, Edit, Eye, Trash } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const AllUser = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const texts = [
    { key: "Full Name", value: "Muhammad Usama" },
    { key: "Passport", value: "FN23344324" },
    { key: "Date of Birth", value: "12 Nov 1997" },
    { key: "Nationality", value: "Spanish" },
    { key: "Origin", value: "Pakistan" },
    { key: "Age", value: "40" },
    { key: "Domicile", value: "Pakistan" },
    { key: "Municipality", value: "Municipality" },
  ];

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
      <ContainerHeader label={"View Users"}/>
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
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="User Details"
      >
        <Grid className={classes.main} align="center" justify={"space-between"}>
          <Grid.Col md={4} className={classes.main}>
            <Avatar
              radius="xl"
              size={150}
              src={userlogo}
              className={classes.avatar}
            />
          </Grid.Col>

          <Grid.Col md={7} style={{ backgroundColor: "white" }}>
            <Text size={24} weight="bold" mb="sm" align="center">
              Urooj Murtaza
            </Text>

            <Container w={"100%"}>
              <SimpleGrid cols={2} spacing="xs">
                <Text className={classes.textheading}>Date of Birth</Text>
                <Text className={classes.textContent}>Date of Birth</Text>
                <Text className={classes.textheading}>Age</Text>
                <Text className={classes.textContent}>Age</Text>

                <Text className={classes.textheading}>Nationality</Text>
                <Text className={classes.textContent}>Nationality</Text>
                <Text className={classes.textheading}>Origin</Text>
                <Text className={classes.textContent}>Origin</Text>
                <Text className={classes.textheading}>Passport</Text>
                <Text className={classes.textContent}>Passport</Text>
                <Text className={classes.textheading}>Domicile</Text>
                <Text className={classes.textContent}>Domicile</Text>
                <Text className={classes.textheading}>Municipality</Text>
                <Text className={classes.textContent}>Municipality</Text>
              </SimpleGrid>
            </Container>
          </Grid.Col>
        </Grid>
      </ViewModal>
    </Container>
  );
};
