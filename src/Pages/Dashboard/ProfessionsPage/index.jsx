import { Anchor, Container, Flex, Grid, Text,useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import routeNames from "../../../Routes/routeNames";
import EditUserModal from "../../Users/AllUsers/EditUserModal";
import ViewUserModal from "../../Users/AllUsers/ViewUserModal";
import Card from "../Card";
import { useStyles } from "./styles";


const ProfessionPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [totalPages, setTotalPages] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [url, setUrl] = useState(`/api/user/listUsers/professionals`);
  const { user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [loading,setLoading]=useState(false)
  const [allUsers,setAllUsers]=useState()
  const [reportData, setReportData] = useState([]);

  
  //API call for fetching all Professions 
  const { data, status } = useQuery(
    ["fetchProfessionUser"],
    () => {
      return axios.get(
        `${
          backendUrl + `/api/user/listUsers/all/1/10`
          // `/api//user/listUsers/${activePage}/10/${filter}/${search}`
        }`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data?.data?.map((obj, ind) => {
          let user = {
            id: obj._id,
            sr: ind + 1,
            name: obj.firstName + " " + obj.lastName,
            userType:
              obj.userType === "socialWorker"
                ? "Social Worker"
                : obj?.userType === "psychologist"
                ? "Psychologist"
                : obj?.userType === "lawyer"
                ? "Lawyer"
                : "",
            email: obj.email,
            status: obj.verificationStatus,
            accStatus: obj.userStatus,
            date: new moment(obj.createdAt).format("DD-MMM-YYYY"),
            phone: obj.phoneNumber,
          };
          return user;
        });
        setRowData(data);
        // setTotalPages(response.data.totalPages);
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
      id: "userType",
      numeric: false,
      disablePadding: true,
      label: "User Type",
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
      view: <Eye color={theme.colors.blue} />,
      edit: <Edit color={theme.colors.green} />,
      delete: <Trash color={theme.colors.red} />,
      numeric: false,
      label: "Actions",
    },
  ];

  const a = [
    // {
    //   title: "TOTAL PROFESSIONALS",
    //   value: "0" ,
    //   progress: 78,
    //   color: "#748FFC",
    //   progressTitle: "Response Rate",
    //   icon: "userD",
    //   // url: `/all`,
    // },
    {
      title: "SOCIAL WORKERS",
      value: "0",
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/all`,
    },
    {
      title: "PSYCHOLOGISTS",
      value: "0",
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/verified`,
    },
    {
      title: "LAWYERS",
      value: "0" ,
      progress: 78,
      color: "#087F5B",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/unverified`,
    },
  ];

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
        if(response.data.status){
          navigate(routeNames.ngoAdmin.professionPageDashboard);
          showNotification({
            title: "Status Updated",
            message: deleteID ? "User deleted successfully!" : "Status updated successfully!",
            color: "green.0",
          });
          queryClient.invalidateQueries("fetchProfessionUser");
        }
        else{
          showNotification({
            title: "Error",
            message: deleteID ?"User not deleted!" : "Status not updated!",
            color: "red.0",
          });
        }
        
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
          Professionals
        </Text>
      </Flex>
      <Grid>
        {a.map((item, index) => (
          <Grid.Col md={"auto"} >
            <Card w={"240"} data={item} setUrl={setUrl} url={url} setPage={setPage}/>
          </Grid.Col>
        ))}
      </Grid>
      {loading ? (
        <Loader minHeight="40vh" />
      ) :(
      <Container mt="md"  size={1035} className={classes.main}>
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
        setReportData={setReportData}

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
        title="User Detail"
      >
        <ViewUserModal id={viewModalData} reportData={reportData}/>
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
export default ProfessionPage;
