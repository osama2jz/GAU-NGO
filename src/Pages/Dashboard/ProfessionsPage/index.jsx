import {
  Anchor,
  Container,
  Flex,
  Grid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { ArrowNarrowLeft, Edit, Eye, Trash } from "tabler-icons-react";
import DeleteModal from "../../../Components/DeleteModal";

import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";

import ViewUserModal from "../../../NGOAdminPages/Professionals/ViewProfessionals/ViewProfessionalModal";
import Card from "../Card";
import userlogo from "../../../assets/teacher.png";
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
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [reportData, setReportData] = useState([]);

  //API call for fetching all Professions
  const { data, status } = useQuery(
    ["fetchProfessionUser", activePage],
    () => {
      setLoading(true)
      return axios.get(
        `${
          backendUrl + `/api/user/listUsers/all/${activePage}/10`
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
            sr: (activePage === 1 ? 0 : (activePage - 1) * 10) + (ind + 1),
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
            image: obj?.profileImage,
          };
          return user;
        });
        setRowData(data);
        setTotalPages(response.data.totalPages);
        setLoading(false)
      },
    }
  );

 
   //API call for fetching all Professions Count
   const { data1, status1 } = useQuery(
    ["fetchProfessionUserCount"],
    () => {
      return axios.get(
        `${
          backendUrl + `/api/user/listUsers/all/0/0`
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
            sr: (activePage === 1 ? 0 : (activePage - 1) * 10) + (ind + 1),
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
        setAllUsers(data);
      },
    }
  );

  const socialWorker = allUsers && allUsers?.filter(
    (e) => e.userType === "Social Worker"
  )
  
  const lawyer = allUsers && allUsers?.filter(
    (e) => e.userType === "Lawyer"
  )
  const psychologist = allUsers && allUsers?.filter(
    (e) => e.userType === "Psychologist"
  )

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
      view: <Eye  />,
      edit: <Edit  />,
      delete: <Trash  />,
      numeric: false,
      label: "Actions",
    },
  ];

  const a = [
    {
      title: "TOTAL PROFESSIONALS",
      value: "0" ,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/all`,
    },
    {
      title: "SOCIAL WORKERS",
      value: socialWorker?.length==="0"?"0":socialWorker?.length,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/all`,
    },
    {
      title: "PSYCHOLOGISTS",
      value: psychologist?.length==="0"?"0":psychologist?.length,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/verified`,
    },
    {
      title: "LAWYERS",
      value: lawyer?.length==="0"?"0":lawyer?.length,
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
        if (response.data.status) {
          navigate(routeNames.ngoAdmin.professionPageDashboard);
          showNotification({
            title: "Status Updated",
            message: deleteID
              ? "User deleted successfully!"
              : "Status updated successfully!",
            color: "green.0",
          });
          queryClient.invalidateQueries("fetchProfessionUser");
        } else {
          showNotification({
            title: "Error",
            message: deleteID ? "User not deleted!" : "Status not updated!",
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
          <Grid.Col md={"auto"}>
            <Card
              w={"240"}
              data={item}
              setUrl={setUrl}
              url={url}
              setPage={setPage}
            />
          </Grid.Col>
        ))}
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <Container mt="md" size={1095} className={classes.main}>
          <Table
            headCells={headerData}
            rowData={rowData}
            setViewModalState={setOpenViewModal}
           
            setDeleteModalState={setOpenDeleteModal}
            onStatusChange={handleChangeStatus.mutate}
            setStatusChangeId={setStatusChangeId}
            setDeleteData={setDeleteID}
            setViewModalData={setViewModalData}
            setReportData={setReportData}
            setEditProfessional={true}
          />
          {totalPages > 1 && (
            <Pagination
              activePage={activePage}
              setPage={setPage}
              total={totalPages}
              radius="xl"
            />
          )}
        </Container>
      )}

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
        title="Professional Detail"
      >
        <ViewUserModal id={viewModalData} reportData={reportData} />
      </ViewModal>
    
    </Container>
  );
};
export default ProfessionPage;
