import { Container, Flex, Grid, Image, Select, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Checks, Edit, Eye, Plus, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewUser from "./viewUser";
import VerifyIcon from "../../../assets/id.png";
const VerificationScheduled = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
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
      accStatus: "Active",
    },
    {
      id: "2",
      name: "Muhammad UUsama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
      accStatus: "Active",
    },
    {
      id: "3",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
      accStatus: "Active",
    },
    {
      id: "4",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
      accStatus: "Active",
    },
    {
      id: "5",
      name: "Muhammad Usama",
      email: "osama@gmail.com",
      date: "12 Jan 2022",
      time: "11:20 PM",
      status: "Processing",
      accStatus: "Active",
    },
  ];

  return (
    <Container className={classes.addUser} size="xl">
      <Flex
        align="center"
        justify="center"
        gap={12}
        className={classes.heading}
      >
        <Image src={VerifyIcon} width={30} height={32} />
        <Text fz={32} fw={600} align="center">
          Verification Scheduled
        </Text>
      </Flex>
      <Container p={"xs"} className={classes.innerContainer}>
      <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0"/>
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
              styles={{float:'right'}}
              onClick={() => navigate(routeNames.socialWorker.addUser)}
            />
          </Grid.Col>
        </Grid>
        <Table
          headCells={headerData}
          rowData={rowData}
          setViewModalState={setOpenViewModal}
        />
      </Container>

      <ViewUser opened={openViewModal} setOpened={setOpenViewModal} />
    </Container>
  );
};
export default VerificationScheduled;
