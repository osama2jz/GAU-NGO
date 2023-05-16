import { Container, Grid, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
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
import DownloadPdf from "../../Reports/downloadPdf";

export const AllUser = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const { user,translate } = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [filter2, setFilter2] = useState("");
  const [search, setSearch] = useState("");
  const [viewModalData, setViewModalData] = useState();
  const [deleteID, setDeleteID] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      view: <Eye />,
      numeric: false,
      label: "Actions",
    },
  ];

  const newData = useMemo(() => {
    let arr = headerData;
    if (user.role === "Social Worker" || user.role === "Admin") {
      headerData.splice(5, 0, {
        id: "userVerify",
        numeric: false,
        disablePadding: true,
        label: "Verify",
      });
      arr = headerData;
    }
    if (user.role === "Social Worker" || user.role === "Admin") {
      (headerData[headerData.length - 1] = {
        id: "actions",
        view: <Eye />,
        edit: <Edit />,
        delete: <Trash />,
        numeric: false,
        label: "Actions",
      }),
        (arr = headerData);
    }
    return arr;
  }, [user]);

  //API call for fetching all users
  const { data, status } = useQuery(
    ["fetchUser"],
    () => {
      let link = `/api/ngo/listNGOUsers/user/0/0/all`;
      return axios.get(`${backendUrl + link}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let user = {
            id: obj?._id,
            sr: (activePage === 1 ? 0 : (activePage - 1) * 10) + (ind + 1),
            name: obj?.firstName + " " + obj?.lastName,
            email: obj?.email,
            age: obj?.userConsentForm?.personalInformation?.age,
            status: obj?.verificationStatus,
            accStatus: obj?.userStatus,
            date: new moment(obj?.createdAt).format("YYYY-MM-DD"),
            phone: obj?.phoneNumber,
            consentSign: obj?.userConsentForm?.consentSignatures,
            aggrementSign: obj?.userConsentForm?.agreementSignatures,
            image: obj?.profileImage,
            consentform: obj?.userConsentForm,
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
        navigate(routeNames.socialWorker.allUsers);
        showNotification({
          title: deleteID ? translate("User Deleted"):translate("Status Updated"),
          message: deleteID ? translate("User Deleted Successfully!"):translate("User Status changed Successfully!"),
          color: "green.0",
        });
        setOpenDeleteModal(false);
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
  };

  const filteredItems = useMemo(() => {
    let filtered = rowData.filter((item) => {
      if (filter === "" && filter2 === "") {
        return item.name.toLowerCase().includes(search.toLowerCase());
      } else if (filter !== "" && filter2 === "")
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.status === filter
        );
      else if (filter === "" && filter2 !== "")
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.accStatus === filter2
        );
      else {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.accStatus === filter2 &&
          item.status === filter
        );
      }
    });
    setTotalPages(Math.ceil(filtered?.length / 10));
    const a = filtered.map((item, ind) => {
      return {
        ...item,
        sr: ind + 1,
      };
    });
    return a;
  }, [rowData, search, filter, filter2]);

  const paginated = useMemo(() => {
    if (activePage == 1) {
      return filteredItems.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return filteredItems.slice(a, a + 10);
    }
  }, [activePage, filteredItems]);

  return (
    <Container className={classes.addUser} size="xl" p={"0px"}>
      <ContainerHeader label={"View Users"} />

      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={12} lg={4} md={6}>
            <InputField
              placeholder="Search Name"
              leftIcon="search"
              pb="0"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={2} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              pb="0px"
              value={filter}
              setData={setFilter}
              data={[
                { label: "All", value: "" },
                { label: "Verified", value: "verified" },
                { label: "Unverified", value: "unverified" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={2} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              pb="0px"
              value={filter2}
              setData={setFilter2}
              data={[
                { label: "All", value: "" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={8} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setFilter("");
                setFilter2("");
                setSearch("");
              }}
            />
          </Grid.Col>
          {(user.role === "Social Worker" || user.role === "Admin") && (
            <Grid.Col sm={6} lg={3} md={4} style={{ textAlign: "end" }}>
              <Button
                label={"Add User"}
                bg={true}
                leftIcon={"plus"}
                styles={{ float: "right" }}
                onClick={() => navigate(routeNames.socialWorker.addUser)}
              />
            </Grid.Col>
          )}
          <Grid.Col sm={3} ml="auto">
            <DownloadPdf
              headCells={headerData}
              data={filteredItems}
              title="Download reports"
              label={("Users")}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={newData}
            rowData={paginated}
            setViewModalState={setOpenViewModal}
            setViewModalData={setViewModalData}
            onStatusChange={handleChangeStatus.mutate}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setReportData}
            setEditId={true}
            setOpenEditModal={setOpenEditModal}
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
        message="Do you really want to delete these records? This process cannot be undone."
      />
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="User Details"
      >
        <ViewUserModal id={viewModalData} reportData={reportData} />
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
