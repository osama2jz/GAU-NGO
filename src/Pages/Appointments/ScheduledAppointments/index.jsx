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
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Eye } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import routeNames from "../../../Routes/routeNames";
import ViewModal from "../../../Components/ViewModal/viewUser";
import userlogo from "../../../assets/teacher.png";
import { useQuery, useQueryClient } from "react-query";
import { useStyles } from "./styles";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import moment from "moment";
import axios from "axios";
import Loader from "../../../Components/Loader";
import { showNotification } from "@mantine/notifications";

function ScheduledAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reportData, setReportData] = useState([]);
  const queryClient = useQueryClient();
  const [id, setId] = useState();

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
            id: obj.appointmentUserId,
            sr: ind + 1,
            caseName: obj?.caseName,
            caseNo: obj?.caseNo,
            name: obj.appointmentUser,
            email: "N/A",
            status: obj.appointmentStatus?.toUpperCase(),
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
        console.log(response);
      },
    }
  );

  //API call for Cancel Appointments
  const CancelAppointments = async (id) => {
    try {
      const response = await axios.get(
        `${backendUrl + `/api/appointment/cancelAppointment/${id}`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
      setOpenViewModal(false);
      if (response.data.status) {
        navigate(routeNames.socialWorker.allAppointments);
        showNotification({
          title: "Appointment Cancelled",
          message: "Appointment Cancelled Successfully",
          color: "green.0",
        });
      } else {
        showNotification({
          title: "Appointment Not Cancelled",
          message: "Appointment Not Cancelled Successfully",
          color: "red.0",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr No.",
    },

    {
      id: "caseName",
      numeric: false,
      disablePadding: true,
      label: "Case Name",
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
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <Container className={classes.addUser} size="xl" p={"0px"}>
      <ContainerHeader label={"Appointment Scheduled"} />
      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              data={[
                { label: "verified", value: "verified" },
                { label: "Pending", value: "pending" },
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
          headCells={headerData}
          rowData={rowData}
          setViewModalState={setOpenViewModal}
          reportData={reportData}
          setReportData={setReportData}
        />
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
}

export default ScheduledAppointments;
