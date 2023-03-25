import { Container, Grid } from "@mantine/core";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Edit, Eye } from "tabler-icons-react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

import axios from "axios";
import { useQuery } from "react-query";
import defaultUser from "../../../assets/teacher.png";
import ContainerHeader from "../../../Components/ContainerHeader";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

function AllAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [editid, setEditId] = useState();
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  //API call for fetching All Scheduled Appointments
  const { data, status } = useQuery(
    "fetchAllAppointmentsData",
    () => {
      return axios.get(
        `${backendUrl + `/api/appointment/listUserAppointments/all`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data.data
          .filter((obj) =>
            user.role === "User" ? obj : obj?.appointmentStatus !== "scheduled"
          )
          .map((obj, ind) => {
            // if (obj?.appointmentStatus !== "scheduled") {
            let appointment = {
              id: obj.appointmentId,
              userid: obj?.appointmentUserId,
              sr: ind + 1,
              caseName: obj?.caseName,
              caseNo: obj?.caseNo,
              name: obj?.appointmentUser,
              caseId: obj?.caseId,
              email: "N/A",
              status: obj?.appointmentStatus?.toUpperCase(),
              time: obj?.scheduledTime,
              date: obj?.addedDate,
              addedBy: obj?.addedBy,
              role:
                obj?.role === "socialWorker"
                  ? "Social Worker"
                  : obj.role === "psychologist"
                  ? "Psychologist"
                  : "Lawyer",
              appointId: obj?.appointmentId,
              doc: obj?.documents,
              docs: obj?.documents.filter((obj) => obj.documentURL.length < 1)
                .length,
              reportData: obj?.reports,
              image: obj?.appointmentUserImage
                ? obj?.appointmentUserImage
                : defaultUser,
            };
            return appointment;
            // }
          });
        setRowData(data);
        setTotalPages(Math.ceil(data?.length / 10));
      },
    }
  );
  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr#",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "addedBy",
      numeric: false,
      disablePadding: true,
      label: "Added By",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: true,
      label: "Role",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
    },
    {
      id: "time",
      numeric: false,
      disablePadding: true,
      label: "Time",
    },
    {
      id: "docs",
      numeric: false,
      disablePadding: true,
      label: "Missing Documents",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },

    {
      id: "actions",
      view: <Eye />,
      edit: <Edit />,
      numeric: false,
      label: "Actions",
    },
  ];

  const filteredItems = rowData.filter(
    (item) =>
      (item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.caseNo?.toLowerCase().includes(search.toLowerCase())) &&
      item?.status?.toLowerCase().includes(filter.toLowerCase())
  );
  const paginated = useMemo(() => {
    if (activePage == 1) {
      return filteredItems.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;

      return filteredItems.slice(a, a + 10);
    }
  }, [activePage, filteredItems]);

  if (status === "loading") {
    return <Loader />;
  }
  return (
    <Container className={classes.addUser} size="xl" p={"0px"}>
      <ContainerHeader label={"View Appointments"} />

      <Container p={"xs"} className={classes.innerContainer} size="xl">
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
              placeholder="Filter by Status"
              value={filter}
              setData={setFilter}
              pb="0px"
              data={[
                { label: "All", value: "" },
                { label: "Closed", value: "closed" },
                // { label: "Scheduled", value: "scheduled" },
                { label: "Cancelled", value: "cancelled" },
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
              label={"Add Appointment"}
              bg={true}
              leftIcon={"plus"}
              styles={{ float: "right" }}
              onClick={() => navigate(routeNames.socialWorker.addAppoinment)}
            />
          </Grid.Col>
        </Grid>
        <Table
          headCells={headerData}
          rowData={paginated}
          setViewModalState={setOpenViewModal}
          setEditIDApp={setEditId}
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
    </Container>
  );
}

export default AllAppointments;
