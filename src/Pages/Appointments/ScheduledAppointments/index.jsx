import {
  Avatar,
  Badge,
  Container,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Eye } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
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

function ScheduledAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [search, setSearch] = useState("");
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [reportData, setReportData] = useState([]);

  //API call for fetching All Scheduled Appointments
  const { data, status } = useQuery(
    "fetchAppointments",
    () => {
      return axios.get(
        `${backendUrl + `/api/appointment/listUserAppointments/scheduled`}`,
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
            userid: obj.appointmentUserId,
            caseName: obj?.caseName,
            caseNo: obj?.caseNo,
            name: obj.appointmentUser,
            email: "N/A",
            status: obj.appointmentStatus?.toUpperCase(),
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
            image: obj?.appointmentUserImage
              ? obj?.appointmentUserImage
              : userlogo,
            project: obj?.project,
          };
          return appointment;
        });
        setRowData(data);
        setTotalPages(Math.ceil(data.length / 10));
      },
    }
  );

  //API call for Cancel Appointments
  const CancelAppointments = useMutation(
    (id) => {
      return axios.get(
        `${backendUrl + `/api/appointment/cancelAppointment/${id}`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Appointment Cancelled",
          message: "Appointment Cancelled Successfully",
          color: "green.0",
        });
        queryClient.invalidateQueries("fetchAppointments");
        setOpenViewModal(false)
      },
    }
  );

  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
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
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "start",
      numeric: false,
      disablePadding: true,
      label: "Start",
    },
    {
      id: "actions",
      view: <Eye />,
      numeric: false,
      label: "Actions",
    },
  ];

  const filteredItems = rowData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.caseName.toLowerCase().includes(search.toLowerCase()) ||
      item.caseNo.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = useMemo(() => {
    if (activePage === 1) {
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
      <ContainerHeader label={"Appointment Schedule"} />
      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={8} lg={5} md={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              value={search}
              pb="0"
              onChange={(v) => setSearch(v.target.value)}
              onKeyDown={(v) => v.key === "Enter" && setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={4} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setSearch("");
              }}
            />
          </Grid.Col>
          <Grid.Col sm={12} lg={6} md={3} style={{ textAlign: "end" }}>
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
          reportData={reportData}
          setReportData={setReportData}
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
        title="Appointment Details"
      >
        <Flex direction={"column"} align="center" justify={"space-between"}>
          <Avatar
            radius="xl"
            size={150}
            src={reportData?.image}
            className={classes.avatar}
          />
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2} spacing="xs">
              <Text className={classes.textheading}>Name</Text>
              <Text className={classes.textContent}>{reportData?.name}</Text>
              <Text className={classes.textheading}>Added By</Text>
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
                  variant="filled"
                  color={
                    reportData?.status === "SCHEDULED" ? "green.0" : "red.0"
                  }
                >
                  {reportData?.status}
                </Badge>
              </Text>
            </SimpleGrid>
          </Container>
        </Flex>
        <Group position="right" mt="lg">
          {reportData?.status === "SCHEDULED" && (
            <Button
              label={" Cancel Appointment"}
              loading={CancelAppointments.isLoading}
              onClick={() => {
                CancelAppointments.mutate(reportData?.appointId);
              }}
            />
          )}
        </Group>
      </ViewModal>
    </Container>
  );
}

export default ScheduledAppointments;
