import { Anchor, Container, Flex, Grid, Text,useMantineTheme } from "@mantine/core";
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


const BranchPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const theme = useMantineTheme();

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
  const [allData,setAllData]=useState()

  
  //API call for fetching all branches
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
      label: "Branch Name",
    },
    {
      id: "location",
      numeric: false,
      disablePadding: true,
      label: "Address",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: "Branch Description",
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

  //API call for fetching all branches
  const { data, status } = useQuery(
    ["fetchBranches"],
    () => {
      return axios.get(
        `${
          backendUrl +
          `/api/ngo/listAllBranches`
          // `/api/ngo/listAllBranches/${activePage}/10/${filter}/${search}`
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
        setAllData(response.data.data)
        console.log(response.data.data)
        let data = response.data.data.map((obj, ind) => {
          let branch = {
            id: obj._id,
            sr: ind + 1,
            name: obj?.branchName,
            location: obj?.branchLocation,
            description: obj?.branchDescription,
            accStatus: obj?.branchStatus
          };
          return branch;
        });
        setRowData(data);
        // setTotalPages(response.data.totalPages);
      },
    }
  );

  const active = allData && allData?.filter((e) => e.branchStatus === "active"
  )
  
  const inactive = allData && allData?.filter(
    (e) => e.branchStatus === "inactive"
  )

  const a = [
    {
      title: "TOTAL BRANCHES",
      value: active ? active?.length + inactive?.length : 0 ,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/all`,
    },
    {
      title: "ACTIVE BRANCHES",
      value: active ? active.length : 0,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/all`,
    },
    {
      title: "INACTIVE BRANCHES",
      value: inactive ? inactive.length : 0,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/verified`,
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
          Branches
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
      ) :(<Container mt="md" className={classes.main}>
      <Table
        headCells={headerData}
        rowData={rowData}
        setViewModalState={setOpenViewModal}
        setEditModalState={setOpenEditModal}
        setDeleteModalState={setOpenDeleteModal}
        // onStatusChange={handleChangeStatus.mutate}
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
        // onDelete={handleDeleted}
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
export default BranchPage;
