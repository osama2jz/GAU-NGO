import {
  Anchor, Avatar, Badge, Container,
  Flex, Grid, Group, SimpleGrid, Text
} from "@mantine/core";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import {
  ArrowNarrowLeft, Eye
} from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import Button from "../../../Components/Button";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import Card from "../Card";
import { useStyles } from "./styles";

const UserPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { user } = useContext(UserContext);
  const [url, setUrl] = useState(`/all`);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allApp, setAllApp] = useState();
  const [reportData, setReportData] = useState([]);

  //API call for fetching all Appointments Count
  const { data4, status4 } = useQuery(
    ["fetchAllUser"],
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
            id: obj.appointmentUserId,
            sr: ind + 1,
            caseName: "N/A",
            caseNo: obj?.caseNo,
            name: obj?.appointmentUser,
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
          };
          return appointment;
        });
        setAllApp(data);
       

      },
    }
  );

  console.log("allApp", allApp);

  const scheduled = allApp && allApp?.filter((e) => e.status === "SCHEDULED");
  const completed = allApp && allApp?.filter((e) => e.status === "CLOSED");
  //API call for fetching All  Appointments
  const { data, status } = useQuery(
   [ "fetchAppointments"],
    () => {
      setLoading(true);
      return axios.get(
        `${backendUrl + `/api/appointment/listUserAppointments` + url}`,
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
            id: obj.appointmentUserId,
            sr: ind + 1,
            caseName: "N/A",
            caseNo: obj?.caseNo,
            name: obj?.appointmentUser,
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
          };
          return appointment;
        });
        setRowData(data);
        setLoading(false);
        setTotalPages(Math.ceil(data?.length / 10));

      },
      enabled: url === `/all` ? true : false,
    }
  );

  //API call for fetching All Scheduled Appointments
  const { data1, status1 } = useQuery(
    ["fetchAppointments1",url],
    () => {
      setLoading(true);
      setPage(1)
      return axios.get(
        `${backendUrl + `/api/appointment/listUserAppointments` + url}`,
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
            id: obj.appointmentUserId,
            sr: ind + 1,
            caseName: "N/A",
            caseNo: obj?.caseNo,
            name: obj?.appointmentUser,
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
          };
          return appointment;
        });
        setRowData(data);
        setLoading(false);
        setTotalPages(Math.ceil(data?.length / 10));

      },
      enabled: url === `/scheduled` ? true : false,
    }
  );

  //API call for fetching All Completed Appointments
  const { data2, status2 } = useQuery(
    "fetchAppointments2",
    () => {
      setLoading(true);
      return axios.get(
        `${backendUrl + `/api/appointment/listUserAppointments` + url}`,
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
            id: obj.appointmentUserId,
            sr: ind + 1,
            caseName: "N/A",
            caseNo: obj?.caseNo,
            name: obj?.appointmentUser,
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
          };
          return appointment;
        });
        setRowData(data);
        setLoading(false);
        setTotalPages(Math.ceil(data?.length / 10));

      },
      enabled: url === `/closed` ? true : false,
    }
  );
  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr#",
    },

    // {
    //   id: "caseName",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Case Name",
    // },
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
      id: "start",
      numeric: false,
      disablePadding: true,
      label: "Start",
    },
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      numeric: false,
      label: "Actions",
    },
  ];

  const a = [
    {
      title: "ALL APPOINTMENTS",
      value: allApp ? allApp?.length : <Loader minHeight="5vh" />,
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "apD",
      url: `/all`,
    },
    {
      title: "SCHEDULED",
      value: scheduled ? scheduled.length : <Loader minHeight="5vh" />,
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "apD",
      url: `/scheduled`,
    },
    {
      title: "COMPLETED",
      value: completed ? completed.length : <Loader minHeight="5vh" />,
      progress: 78,
      color: "#087F5B",
      progressTitle: "Response Rate",
      icon: "apD",
      url: `/closed`,
    },
  ];

  const paginated = useMemo(() => {
    if (activePage == 1) {
      return rowData.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return rowData.slice(a, a + 10);
    }
  }, [activePage, rowData]);

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
          Appointment
        </Text>
      </Flex>
      <Grid>
        {a.map((item, index) => (
          <Grid.Col md={"auto"}>
            <Card data={item} setUrl={setUrl} url={url} />
          </Grid.Col>
        ))}
      </Grid>
      {loading ? (
        <Loader minHeight="40vh" />
      ) : (
        <Container mt="md" size={1035} className={classes.main}>
          <Table
            headCells={headerData}
            rowData={paginated}
            setViewModalState={setOpenViewModal}
            setEditModalState={setOpenEditModal}
            setDeleteModalState={setOpenDeleteModal}
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
      )}

      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Appointment Details"
      >
        <Flex direction={"column"} align="center" justify={"space-between"}>
          <Avatar
            radius="xl"
            size={150}
            src={userlogo}
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
        <Group position="right" mt="lg">
          <Button
            label={" Cancel Appointment"}
            onClick={() => {
              // setId(reportData?.appointId);
              // queryClient.invalidateQueries("CancelAppointments",id);
              CancelAppointments(reportData?.appointId);
            }}

            // type="Cancel Appo"
          />
        </Group>
      </ViewModal>
    </Container>
  );
};
export default UserPage;
