import {
  Container, Grid
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Checks, Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import EditModal from "../../../Components/EditModal/editModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import EditUserModal from "./EditUserModal";
import { useStyles } from "./styles";
import ViewUserModal from "./ViewUserModal";

export const AllUser = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [viewModalData,setViewModalData]=useState()
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(UserContext);
  console.log("id",viewModalData)

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

  //API call for fetching all users
  const { data, status } = useQuery(
    "fetchUser",
    () => {
      return axios.get(
        `${backendUrl + `/api/ngo/listNGOUsers/user/${activePage}/10`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.data.map((obj, ind) => {
          let user = {
            id: obj._id,
            sr: ind + 1,
            name: obj.firstName + " " + obj.lastName,
            email: obj.email,
            status: obj.verificationStatus,
            accStatus: obj.userStatus,
            date: new moment(obj.createdAt).format("DD-MMM-YYYY"),
          };
          return user;
        });
        setRowData(data);
        setTotalPages(response.data.data.totalPages);
      },
    }
  );

  //API call for changing user status
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
        queryClient.invalidateQueries("fetchUser");
      },
    }
  );
  
//API call for deleting user
  const handleDeleted = () => {
    handleChangeStatus.mutate({
      userId: deleteID,
      userStatus: "deleted",
    });
    setOpenDeleteModal(false);
  };

  if (status == "loading") {
    return <Loader />;
  }
  return (
    <Container className={classes.addUser} size="xl"> 
      <ContainerHeader label={"View Users"} />

      <Container className={classes.innerContainer} size="xl">
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
          setViewModalData={setViewModalData}
          setEditModalState={setOpenEditModal}
          setStatusChangeId={setStatusChangeId}
          onStatusChange={handleChangeStatus.mutate}
          setDeleteData={setDeleteID}
          setDeleteModalState={setOpenDeleteModal}
        />
        {totalPages>1 && <Pagination
          activePage={activePage}
          setPage={setPage}
          total={totalPages}
          radius="xl"
        />}
      </Container>
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleted}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="User Details"
        
        
      >
       {/* <ViewUser id={viewModalData}/> */}
       <ViewUserModal id={viewModalData}/>
      </ViewModal>
      <EditModal
      opened={openEditModal}
      setOpened={setOpenEditModal}
      title="Edit User Details">
        
        <EditUserModal id={viewModalData} setOpenEditModal={setOpenEditModal}/>
      </EditModal>
      
    </Container>
  );
};
