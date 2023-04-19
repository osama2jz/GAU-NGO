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
import { useContext, useMemo, useState } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { ArrowNarrowLeft, Edit, Eye, Trash } from "tabler-icons-react";
import DeleteModal from "../../../Components/DeleteModal";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

import ViewUserModal from "../../../NGOAdminPages/Branches/viewBranches/ViewBranchModal";
import Card from "../Card";
import { useStyles } from "./styles";
import ContainerHeader from "../../../Components/ContainerHeader";

const BranchPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const theme = useMantineTheme();
  const queryClient = new QueryClient();
  const [totalPages, setTotalPages] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [url, setUrl] = useState(`/api/user/listUsers/professionals`);
  const { user, translate } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [allData, setAllData] = useState();
  const [BranchData, setBranchData] = useState([]);

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
      id: "branchEmail",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "branchPointOfContact",
      numeric: false,
      disablePadding: true,
      label: "Point of Contact",
    },
    {
      id: "contact",
      numeric: false,
      disablePadding: true,
      label: "Branch Contact",
    },
    {
      id: "accStatus",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "actions",
      view: <Eye />,
      edit: <Edit />,
      delete: <Trash />,
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
          backendUrl + `/api/ngo/listAllBranches`
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
        setAllData(response.data.data);
        let data = response.data.data.map((obj, ind) => {
          let branch = {
            id: obj._id,
            sr: ind + 1,
            name: obj?.branchName,
            location: obj?.branchLocation,
            description: obj?.branchDescription,
            contact: obj?.branchContact || "N/A",
            accStatus: obj?.branchStatus,
            image: obj?.branchPicture ? obj?.branchPicture : ngoDefault,
            branchPointOfContact: obj?.branchPointOfContact,
            branchEmail: obj?.branchEmail,
            branchContact: obj?.branchContact,
          };
          return branch;
        });
        setRowData(data);
        setTotalPages(Math.ceil(data?.length / 10));

        // setTotalPages(response.data.totalPages);
      },
    }
  );

  //API call for changing user status
  const handleChangeStatus = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/ngo/editBranch"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        // navigate(routeNames.ngoAdmin.branchPageDashboard);
        showNotification({
          title: "Status Updated",
          message: deleteID
            ? "Branch Deleted Successfully!"
            : "Branch Status changed Successfully!",
          color: "green.0",
        });
        setOpenDeleteModal(false);
        queryClient.invalidateQueries("fetchBranches");
      },
      onError: (res) => {
        showNotification({
          title: "Error",
          message: "Something Went Wrong!",
          color: "red.0",
        });
      },
    }
  );

  //API call for deleting user
  const handleDeleted = () => {
    handleChangeStatus.mutate({
      branchId: deleteID,
      branchStatus: "deleted",
    });
  };

  const paginated = useMemo(() => {
    if (activePage == 1) {
      return rowData.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return rowData.slice(a, a + 10);
    }
  }, [activePage, rowData]);

  const active = allData && allData?.filter((e) => e.branchStatus === "active");

  const inactive =
    allData && allData?.filter((e) => e.branchStatus === "inactive");

  const a = [
    {
      title: "TOTAL BRANCHES",
      value: active ? active?.length + inactive?.length : 0,
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
      color: "green.0",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/all`,
    },
    {
      title: "INACTIVE BRANCHES",
      value: inactive ? inactive.length : 0,
      progress: 78,
      color: "red.0",
      progressTitle: "Response Rate",
      icon: "userD",
      // url: `/verified`,
    },
  ];

  return (
    <Container className={classes.main} size="lg">
      <Flex justify="center" align="center">
        <Anchor
          fz={12}
          fw="bolder"
          className={classes.back}
          onClick={() => navigate(-1)}
        >
          <ArrowNarrowLeft />
          <Text>{translate("Back")}</Text>
        </Anchor>
        <ContainerHeader label={"Branches"} style={{ marginRight: "auto" }} />
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
        <Loader minHeight="40vh" />
      ) : (
        <Container mt="md" size={1095} className={classes.main}>
          <Table
            headCells={headerData}
            rowData={paginated}
            setViewModalState={setOpenViewModal}
            setEditModalState={setOpenEditModal}
            setDeleteModalState={setOpenDeleteModal}
            onStatusChange={handleChangeStatus.mutate}
            setStatusChangeId={setStatusChangeId}
            setDeleteData={setDeleteID}
            setViewModalData={setViewModalData}
            setReportData={setBranchData}
            setEditBranch={true}
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
        loading={handleChangeStatus.isLoading}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Branch Details"
      >
        <ViewUserModal id={viewModalData} reportData={BranchData} />
      </ViewModal>
    </Container>
  );
};
export default BranchPage;
