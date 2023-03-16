import { Container, Grid, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
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

export const ViewBranches = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(UserContext);

  const [reportData, setReportData] = useState([]);

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
        let data = response.data.data.map((obj, ind) => {
          let branch = {
            id: obj._id,
            sr: ind + 1,
            name: obj?.branchName,
            location: obj?.branchLocation,
            description: obj?.branchDescription,
            accStatus: obj?.branchStatus,
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
        navigate(routeNames.ngoAdmin.viewBranches);
        showNotification({
          title: "Status Updated",
          message: "User Status changed Successfully!",
          color: "green.0",
        });
        queryClient.invalidateQueries("fetchBranches");
      },
    }
  );

  //API call for deleting user
  const handleDeleted = () => {
    handleChangeStatus.mutate({
      branchId: deleteID,
      branchStatus: "deleted",
    });
    setOpenDeleteModal(false);
  };

  const filteredItem = rowData.filter((item) => {
    if (filter === "") {
      return item.name.toLowerCase().includes(search.toLowerCase());
    } else
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        item.accStatus === filter
      );
  });

  const Paginated=useMemo(()=>{
    if(activePage===1){
      return filteredItem.slice(0,10)
    }else{
      let a = (activePage - 1) * 10;
      console.log("a",a)
      
      return filteredItem.slice(a, a + 10);
    
    }
  },[activePage,filteredItem])

 

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Branches"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              onKeyDown={(v) => v.key === "Enter" && setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              pb="0px"
              value={filter}
              setData={setFilter}
              data={[
                { label: "All", value: "" },
                { label: "Active", value: "active" },
                { label: "InActive", value: "inactive" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <Button
              label={"Add Branch"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.ngoAdmin.addBranch)}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={Paginated}
            setViewModalState={setOpenViewModal}
            setViewModalData={setViewModalData}
            setEditModalState={setOpenEditModal}
            setStatusChangeId={setStatusChangeId}
            onStatusChange={handleChangeStatus.mutate}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setReportData}
          />
        )}
        {totalPages > 1 && (
          <Pagination
            activePage={activePage}
            setPage={setPage}
            total={totalPages}
            radius="xl"
          />
        )}
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
        title="Branch Details"
      >
        {/* <ViewUser id={viewModalData}/> */}
        <ViewUserModal id={viewModalData} reportData={reportData} />
      </ViewModal>
      <EditModal
        opened={openEditModal}
        setOpened={setOpenEditModal}
        title="Edit Branch Details"
      >
        <EditUserModal
          id={viewModalData}
          setOpenEditModal={setOpenEditModal}
          reportData={reportData}
        />
      </EditModal>
    </Container>
  );
};
