import { Anchor, Container, Flex, Grid, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { ArrowNarrowLeft, Edit, Eye, Trash } from "tabler-icons-react";
import DeleteModal from "../../../Components/DeleteModal";
import EditModal from "../../../Components/EditModal/editModal";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import EditUserModal from "../../Users/AllUsers/EditUserModal";
import ViewUserModal from "../../Users/AllUsers/ViewUserModal";
import Card from "../Card";
import { useStyles } from "./styles";

const UserPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [url, setUrl] = useState(`/all`);
  const { user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [loading,setLoading]=useState(false)
  const [allUsers,setAllUsers]=useState()

  //API call for fetching all users Count
  const { data4, status4 } = useQuery(
    ["fetchAllUser", activePage, url],
    () => {
      setLoading(true)
      return axios.get(`${backendUrl + `/api/ngo/listNGOUsers/user/0/0`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
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
        setAllUsers(data);
       
      },
    }
  );

  // console.log("allUsers",allUsers)
  // const verified = allUsers && allUsers?.filter(
  //   // console.log(e)
  
  //   // (e) => e.verificationStatus === "verified"
  // );
  const verified = allUsers && allUsers?.filter(
    (e) => e.status === "verified"
  )
  const unverified = allUsers && allUsers?.filter(
    (e) => e.status === "unverified"
  )

 
 var unverifiedCount=unverified?.length
 var verifiedCount=verified?.length
  

  //API call for fetching all users 
  const { data, status } = useQuery(
    ["fetchUser", activePage, url],
    () => {
      setLoading(true)
      return axios.get(`${backendUrl + `/api/ngo/listNGOUsers/user/${activePage}/10`+url}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
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
        setTotalPages(response.data.totalPages);
        setLoading(false)
      },
      enabled:
        url === `/all` ? true : false,
    }
  );

   //API call for fetching all Verified users
   const { data1, status1 } = useQuery(
    ["fetchverifiedUser", activePage, url],
    () => {
      setLoading(true)
      return axios.get(`${backendUrl + `/api/ngo/listNGOUsers/user/${activePage}/10`+url}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
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
        setTotalPages(response.data.totalPages);
        setLoading(false)
      },
      enabled:
        url === `/verified` ? true : false,
    }
  );

   //API call for fetching all Unverified users
   const { data2, status2 } = useQuery(
    ["fetchUnverifiedUser",activePage, url],
    () => {
      setLoading(true)
      return axios.get(`${backendUrl + `/api/ngo/listNGOUsers/user/${activePage}/10`+url}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
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
        setTotalPages(response.data.totalPages);
        setLoading(false)
      },
      enabled:
        url === `/unverified` ? true : false,
    }
  );

  //API call for deleting user
  const handleDeleted = () => {{handleChangeStatus.mutate({
      userId: deleteID,
      userStatus: "deleted",
    });
    
    setOpenDeleteModal(false);
    showNotification({
      title: "Deleted",
      message: "User Deleted Successfully!",
      color: "green.0",
    });
    queryClient.invalidateQueries("fetchUser");
   
  }}

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
        // navigate(routeNames.socialWorker.allUsers);
        showNotification({
          title: "Status Updated",
          message: "User Status changed Successfully!",
          color: "green.0",
        });
        queryClient.invalidateQueries("fetchUser");
      },
    }
  );

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
      id: "userVerify",
      numeric: false,
      disablePadding: true,
      label: "Verify",
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
      numeric: false,
      label: "Actions",
    },
  ];

  const a = [
    {
      title: "ALL USERS",
      value: verifiedCount ? verifiedCount+unverifiedCount :"0",
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "userD",
      url: `/all`,
    },
    {
      title: "VERIFIED",
      value: verifiedCount ? verifiedCount :"0",
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "userD",
      url: `/verified`,
    },
    {
      title: "UNVERIFIED",
      value: unverifiedCount ? unverifiedCount: "0",
      progress: 78,
      color: "#087F5B",
      progressTitle: "Response Rate",
      icon: "userD",
      url: `/unverified`,
    },
  ];

  return (
    <Container className={classes.main} size="lg">
      <Flex justify="center" align="center" mb="md">
        <Anchor
          fz={12}
          fw="bolder"
          className={classes.back}
          onClick={() => navigate(-1)}
        >
          <ArrowNarrowLeft />
          <Text>Back</Text>
        </Anchor>
        <Text fz={28} fw="bolder" mb="sm" mr="auto">
          User
        </Text>
      </Flex>
      <Grid>
        {a.map((item, index) => (
          <Grid.Col md={"auto"}>
            <Card data={item} setUrl={setUrl} url={url} setPage={setPage}/>
          </Grid.Col>
        ))}
      </Grid>
      {loading ? (
        <Loader minHeight="40vh" />
      ) :(<Container mt="md" className={classes.main}>
      <Table
        headCells={headerData}
        rowData={rowData}
        setViewModalState={setOpenViewModal}
        setEditModalState={setOpenEditModal}
        setDeleteModalState={setOpenDeleteModal}
        onStatusChange={handleChangeStatus.mutate}
        setStatusChangeId={setStatusChangeId}
        setDeleteData={setDeleteID}
        setViewModalData={setViewModalData}
      />
      {totalPages > 1 && (
        <Pagination
          activePage={activePage}
          setPage={setPage}
          total={totalPages}
          radius="xl"
        />
      )}
    </Container>)}
      
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
        <ViewUserModal id={viewModalData} />
      </ViewModal>
      <EditModal
        opened={openEditModal}
        setOpened={setOpenEditModal}
        title="Edit User Details"
      >
        <EditUserModal id={viewModalData} setOpenEditModal={setOpenEditModal} />
      </EditModal>
    </Container>
  );
};
export default UserPage;
