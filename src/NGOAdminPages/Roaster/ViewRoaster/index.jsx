import { Container, Grid, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import DeleteModal from "../../../Components/DeleteModal";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewRoasterModal from "./ViewRoasterModal";

export const ViewRoasters = () => {
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
      label: "Name",
    },
    {
      id: "userType",
      numeric: false,
      disablePadding: true,
      label: "User Type",
    },
    {
      id: "ngo",
      numeric: false,
      disablePadding: true,
      label: "NGO Name",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "User Status",
    },
    {
      id: "actions",
      view: <Eye color={theme.colors.blue} />,
      // edit: <Edit color={theme.colors.green} />,
      // delete: <Trash color={theme.colors.red} />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching all schedule
  const { data, status } = useQuery(
    ["fetchSchedule"],
    () => {
      return axios.get(
        `${backendUrl + `/api/schedule/listNGOUsersSchedule/`}`,
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
          let User = {
            id: obj.userId,
            sr: ind + 1,
            name: obj.fullName,
            userType:
              obj.role === "socialWorker"
                ? "Social Worker"
                : obj?.role === "psychologist"
                ? "Psychologist"
                : obj?.role === "lawyer"
                ? "Lawyer"
                : obj?.role === "ngoadmin"
                ? "Admin"
                : "",
            status: obj.schedule ? "Schduled" : "Not Scheduled",
            ngo: user?.name,
          };
          return User;
        });
        setRowData(data);
        // setTotalPages(response.data.totalPages);
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
          color: "green.0",
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

  // console.log("rowData", rowData);
  const filteredItems = rowData.filter(
    (item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()) &&
      item?.userType?.toLowerCase().includes(filter.toLowerCase())
  );

  const paginated = useMemo(() => {
    if (activePage === 1) {
      return filteredItems.slice(0, 10);
    } else {
      return filteredItems.slice((activePage - 1) * 10, activePage * 10);
    }
  }, [activePage, filteredItems]);

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Roasters"} />

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
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychlogist", value: "psychologist" },
                { label: "Social Worker", value: "social Worker" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <Button
              label={"Add Roaster"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.ngoAdmin.addRoaster)}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={paginated}
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

      <ViewRoasterModal
        id={viewModalData}
        reportData={reportData}
        opened={openViewModal}
        setOpened={setOpenViewModal}
      />
    </Container>
  );
};
