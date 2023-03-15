import {
  Container,
  Flex,
  Grid,
  Text,
  Avatar,
  SimpleGrid,
  Badge,
} from "@mantine/core";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Edit, Eye, Trash } from "tabler-icons-react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import calender from "../../../assets/calendar.png";
import ViewAppointment from "./ViewAppointment";
import ViewModal from "../../../Components/ViewModal/viewUser";

import ContainerHeader from "../../../Components/ContainerHeader";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { useQuery } from "react-query";
import { UserContext } from "../../../contexts/UserContext";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import defaultUser from "../../../assets/teacher.png";

import hello from "../../../assets/calendar.png"


function AllAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [reportData, setReportData] = useState([]);
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
        let data = response.data.data.map((obj, ind) => {
          let appointment = {
            id: obj.appointmentId,
            sr: ind + 1,
            caseName: obj?.caseName,
            caseNo: obj?.caseNo,
            name: obj?.appointmentUser,
            caseId: obj?.caseId,
            email: "N/A",
            status: obj?.appointmentStatus?.toUpperCase(),
            time: obj?.scheduledTime,
            date: obj?.addedDate,
            addedBy: obj?.appointmentWith,
            role:
              obj?.role === "socialWorker"
                ? "Social Worker"
                : obj.role === "psychologist"
                ? "Psychologist"
                : "Lawyer",
            appointId: obj?.appointmentId,
            doc: obj?.documents,
            reportData: obj?.reports,
            image:obj?.appointmentUserImage!=="N/A" ? obj?.appointmentUserImage : defaultUser,
          };
          return appointment;
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
      id: "caseNo",
      numeric: false,
      disablePadding: true,
      label: "Case No.",
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
      label: "Appointee",
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
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
   
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      edit: <Edit color="#4069bf" />,
      numeric: false,
      label: "Actions",
    },
  ];

  const newData = useMemo(() => {
    let arr = headerData;
    if (
      user.role === "Social Worker" ||
      user.role === "Psychologist" ||
      user.role === "Lawyer"
    ) {
      headerData.splice(8, 0, {
        id: "start",
        numeric: false,
        disablePadding: true,
        label: "Start",
      });
      arr = headerData;
    }
    return arr;
  }, [user]);

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
              value={filter}
              setData={setFilter}
              pb="0px"
              data={[
                { label: "All", value: "" },
                { label: "Closed", value: "closed" },
                { label: "Scheduled", value: "scheduled" },
                { label: "Cancelled", value: "cancelled" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
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
          headCells={newData}
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

      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Appointment #2345"
        size="560px"
      >
        <Flex direction={"column"} align="center" justify={"space-between"}>
          <Avatar
            radius="xl"
            size={150}
            src={defaultUser}
            className={classes.avatar}
          />

          <Text size={24} weight="bold" mb="sm" align="center">
            {reportData?.name}
          </Text>
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2} spacing="xs">
              <Text className={classes.textheading}>Appointee</Text>
              <Text className={classes.textContent}>{reportData?.addedBy}</Text>
              <Text className={classes.textheading}>Case Name</Text>
              <Text className={classes.textContent}>
                {reportData?.caseName}
              </Text>
              <Text className={classes.textheading}>Appointment Date</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>Appointment Time</Text>
              <Text className={classes.textContent}>{reportData?.time}</Text>
              <Text className={classes.textheading}>Status</Text>
              <Text className={classes.textContent}>
                <Badge
                  variant="outline"
                  color={
                    reportData?.status === "SCHEDULED" ? "blue.0" : "red.0"
                  }
                >
                  {reportData?.status}
                </Badge>
              </Text>
            </SimpleGrid>
          </Container>
        </Flex>
      </ViewModal>
    </Container>
  );
}

export default AllAppointments;
