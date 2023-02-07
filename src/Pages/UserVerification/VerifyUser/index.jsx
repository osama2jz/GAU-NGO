import { Anchor, Container, Flex, Grid, Group, Text } from "@mantine/core";
import { useState } from "react";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import Table from "../../../Components/Table";
import { useStyles } from "./styles";

export const VerifyUser = () => {
  const { classes } = useStyles();
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
      view: <Button label="Verify" primary={true} />,
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
      time: "11:20 PM",
      status: "Processing",
    },
    {
      id: "2",
      name: "Muhammad UUsama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
    },
    {
      id: "3",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
    },
    {
      id: "4",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
    },
    {
      id: "5",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
    },
  ];

  return (
    <Container className={classes.schedule} size="lg">
      <Text fz={"xl"} fw="bolder" align="center">
        Verify Users
      </Text>
      <Container p={"xl"}>
        <Table
          headCells={headerData}
          rowData={rowData}
          setEditData={setOpenEditModal}
          setViewModalState={setOpenViewModal}
          setDeleteModalState={setOpenDeleteModal}
        />
      </Container>
    </Container>
  );
};
