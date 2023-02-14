import {
  Avatar,
  Container,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { Checks, Edit, Eye, Trash } from "tabler-icons-react";
import user from "../../../assets/user.png";
import Button from "../../../Components/Button";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewModal from "./viewUser";

export const AllUser = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const { user } = useContext(UserContext);


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
      id: "sr",
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

  const { data, status } = useQuery(
    "fetchUser",
    () => {
      return axios.get(`${backendUrl + "/api/ngo/listNGOUsers/user"}`, {
        headers: {
          "x-access-token":user.token},
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let user = {
            id: obj._id,
            sr: ind + 1,
            name: obj.firstName + " " + obj.lastName,
            email: obj.email,
            status: obj.verificationStatus,
            accStatus: obj.userStatus,
            date: new moment(obj.createdAt).format("DD MM YYYY"),
          };
          return user;
        });
        setRowData(data);
      }
    }
  );

  const handleChangeStatus = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/changeStatus"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        navigate(routeNames.socialWorker.allUsers);
        showNotification({
          title: "Status Updated",
          message: "User Status changed Successfully!",
          color: "green",
        });
      },
    }
  );

  if (status == "loading") {
    return <Loader />;
  }
  return (
    <Container className={classes.addUser} size="xl">
      <Flex
        align="center"
        justify="center"
        gap={12}
        className={classes.heading}
      >
        {/* <Image src={user} width={30} height={32} /> */}
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
              pb="0px"
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
          setStatusChangeId={setStatusChangeId}
          onStatusChange={handleChangeStatus.mutate}
          setDeleteModalState={setOpenDeleteModal}
        />
        <Pagination
          activePage={activePage}
          setPage={setPage}
          total={10}
          radius="xl"
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
