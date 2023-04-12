import { Container, Grid, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useDeferredValue, useMemo, useState } from "react";
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

import { useStyles } from "./styles";
import ViewProfessionalModal from "./ViewProfessionalModal";
import userlogo from "../../../assets/teacher.png";

export const ViewProfessionals = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewModalData, setViewModalData] = useState();
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const { user } = useContext(UserContext);

  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const defferedSearch = useDeferredValue(search);

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

  //API call for fetching all professionals
  const { data, status } = useQuery(
    ["fetchUserProfessionals"],
    () => {
      let link =
        // defferedSearch.length > 0 || filter !== "all"
        //   ? `/api/user/listUsers/${filter}/0/0/${defferedSearch}`
        `/api/user/listUsers/all/0/0`;
      return axios.get(
        `${
          // backendUrl + `/api/user/listUsers/all/${activePage}/10`
          backendUrl + link
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
            // status: obj.verificationStatus,
            accStatus: obj.userStatus,
            date: new moment(obj.createdAt).format("DD-MMM-YYYY"),
            phone: obj.phoneNumber,
            image: obj?.profileImage,
            idDetails: obj.IDDetails ? obj.IDDetails : "",
          };
          return user;
        });
        setRowData(data);
        setTotalPages(response.data.totalPages);
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
        navigate(routeNames.ngoAdmin.viewProfessionals);
        showNotification({
          title: "Status Updated",
          message: "User Status changed Successfully!",
          color: "green.0",
        });
        setOpenDeleteModal(false);
        queryClient.invalidateQueries("fetchUserProfessionals");
      },
    }
  );

  //API call for deleting user
  const handleDeleted = () => {
    handleChangeStatus.mutate({
      userId: deleteID,
      userStatus: "deleted",
    });
  };

  const FilteredData = useMemo(() => {
    let filteredData = rowData.filter((obj) => {
      if (filter === "") {
        return obj?.name.toLowerCase().includes(search.toLowerCase());
      } else {
        return (
          obj?.name.toLowerCase().includes(search.toLowerCase()) &&
          obj?.userType.toLowerCase().includes(filter.toLowerCase())
        );
      }
    });
    setPage(1)
    setTotalPages(Math.ceil(filteredData?.length / 10));
    const a = filteredData.map((item, ind) => {
      return {
        ...item,
        sr: ind + 1,
      };
    });
    return a;
  },[rowData, search, filter]);

  const Paginated = useMemo(() => {
    if (activePage === 1) {
      return FilteredData.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return FilteredData.slice(a, a + 10);
    }
  }, [activePage, FilteredData]);


  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"View Professionals"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={5} lg={5} md={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3} md={3}>
            <SelectMenu
              placeholder="Filter by Type"
              pb="0px"
              value={filter}
              setData={setFilter}
              data={[
                { label: "All", value: "" },
                { label: "Social Worker", value: "social Worker" },
                { label: "Psychlogist", value: "psychologist" },
                { label: "Lawyer", value: "lawyer" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setFilter("");
                setSearch("");
              }}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3} md={4} style={{ textAlign: "end" }}>
            <Button
              label={"Add Professional"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.ngoAdmin.addProfessional)}
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
            onStatusChange={handleChangeStatus.mutate}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setReportData}
            setEditProfessional={true}
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
        loading={handleChangeStatus.isLoading}
        label="Are you Sure?"
        message="Do you really want to delete these record? This process cannot be undone."
      />
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Professional Details"
      >
        {/* <ViewUser id={viewModalData}/> */}
        <ViewProfessionalModal id={viewModalData} reportData={reportData} />
      </ViewModal>
    </Container>
  );
};
