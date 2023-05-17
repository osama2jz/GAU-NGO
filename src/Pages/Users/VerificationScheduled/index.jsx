import { Container, Grid, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { Eye } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import userlogo from "../../../assets/teacher.png";
import { useStyles } from "./styles";
import ViewUserModal from "../AllUsers/ViewUserModal";
import Pagination from "../../../Components/Pagination";
import DownloadPdf from "../../Reports/downloadPdf";
import SelectMenu from "../../../Components/SelectMenu";
const VerificationScheduled = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, translate } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewModalData, setViewModalData] = useState();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusChangeId, setStatusChangeId] = useState("");
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
      label: translate("Name"),
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: translate("Email"),
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: translate("Date"),
    },
    {
      id: "time",
      numeric: false,
      disablePadding: true,
      label: translate("Time"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: translate("User Status"),
    },
    {
      id: "userVerify",
      numeric: false,
      disablePadding: true,
      label: translate("Verify"),
    },
    {
      id: "accStatus",
      numeric: false,
      disablePadding: true,
      label: translate("Status"),
    },

    {
      id: "actions",
      view: <Eye />,
      numeric: false,
      label: translate("Actions"),
    },
  ];

  //API call for fetching all users
  const { data, status } = useQuery(
    ["fetchUserforVerification"],
    () => {
      return axios.get(
        `${backendUrl + `/api/ngo/listNGOappointmentUsers/user/0/0`}`,
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
          let user = {
            id: obj._id,
            sr: (activePage === 1 ? 0 : (activePage - 1) * 10) + (ind + 1),
            name: obj.firstName + " " + obj.lastName,
            email: obj.email,
            time: obj.scheduleTime,
            status: obj.verificationStatus,
            accStatus: obj.userStatus,
            date: new moment(obj.scheduleDate).format("YYYY-MM-DD"),
            // date:
            //   new moment(obj.scheduleDate).format("YYYY") +
            //   "-" +
            //   translate(new moment(obj.scheduleDate).format("MM")) +
            //   "-" +
            //   new moment(obj.scheduleDate).format("DD"),
            phone: obj.phoneNumber,
            image: obj?.profileImage,
            appointmentId: obj?.appointmentId,
          };
          return user;
        });
        setRowData(data);
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
        // navigate(routeNames.socialWorker.allUsers);
        showNotification({
          title: translate("Status Updated"),
          message: translate("User Status changed Successfully!"),
          color: "green.0",
        });
        queryClient.invalidateQueries("fetchUserforVerification");
      },
    }
  );

  const filteredItems = useMemo(() => {
    let filtered = rowData.filter((item) => {
      if (filter === "") {
        return item.name.toLowerCase().includes(search.toLowerCase());
      } else {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          item.accStatus === filter
        );
      }
    });
    setPage(1)
    setTotalPages(Math.ceil(filtered?.length / 10));
    const a = filtered.map((item, ind) => {
      return {
        ...item,
        sr: ind + 1,
      };
    });
    return a;
  }, [rowData, search, filter]);

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
      <ContainerHeader label={"Users Schedule"} />
      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={5}>
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
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setSearch("");
                setFilter("");
              }}
            />
          </Grid.Col>

          <Grid.Col sm={3} ml="auto">
            {user.role === "Social Worker" && (
              <Button
                label={"Add User"}
                bg={true}
                leftIcon={"plus"}
                styles={{ float: "right" }}
                onClick={() => navigate(routeNames.socialWorker.addUser)}
              />
            )}
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <DownloadPdf
              headCells={headerData}
              data={filteredItems}
              label={"Scheduled Users"}
              title={"Scheduled Users"}
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
            setStatusChangeId={setStatusChangeId}
            onStatusChange={handleChangeStatus.mutate}
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
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="User Schedule Details"
      >
        <ViewUserModal
          id={viewModalData}
          reportData={reportData}
          cancelButton={true}
          setOpenViewModal={setOpenViewModal}
        />
      </ViewModal>
    </Container>
  );
};
export default VerificationScheduled;
