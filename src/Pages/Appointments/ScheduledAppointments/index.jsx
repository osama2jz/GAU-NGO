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
import DownloadPdf from "../../Reports/downloadPdf";
import moment from "moment";

function ScheduledAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user,translate } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [search, setSearch] = useState("");
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [reportData, setReportData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //API call for fetching All Scheduled Appointments
  const { data, status } = useQuery(
    "fetchAppointmentsData",
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
            appointmentWith: obj?.appointmentWith,
            caseNo: obj?.caseNo,
            name: obj.appointmentUser,
            email: "N/A",
            status: obj.appointmentStatus?.toUpperCase(),
            time: obj?.scheduledTime,
            date: moment(obj?.addedDate).format("YYYY-MMM-DD"),

            addedBy: obj?.refered === true ? obj?.referedName : obj?.addedBy,
            // addedBy: obj?.addedBy,
            role: obj?.refered
              ? obj?.referedRole === "socialWorker"
                ? "Social Worker"
                : obj.role === "psychologist"
                ? "Psychologist"
                : "Lawyer"
              : obj?.role === "socialWorker"
              ? "Social Worker"
              : obj.role === "psychologist"
              ? "Psychologist"
              : obj.role === "lawyer"
              ? "Lawyer"
              : "Admin",

            appointId: obj?.appointmentId,
            image: obj?.appointmentUserImage,
            project: obj?.project,
            refer: obj?.refered === true ? "Refered" : "New",
            referedComment: obj?.referedComment,
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
        navigate(routeNames.socialWorker.allAppointments);
        setOpenDeleteModal(false);
        setOpenViewModal(false);
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
      id: "appointmentWith",
      numeric: false,
      disablePadding: true,
      label: "Professional",
    },
    {
      id: "addedBy",
      numeric: false,
      disablePadding: true,
      label: "Appointer",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: true,
      label: "Appointer Role",
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
      id: "refer",
      numeric: false,
      disablePadding: true,
      label: "Refered",
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

  const filteredItems = useMemo(() => {
    let filtered = rowData.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.caseName.toLowerCase().includes(search.toLowerCase()) ||
        item.caseNo.toLowerCase().includes(search.toLowerCase())
      );
    });

    setPage(1);
    setTotalPages(Math.ceil(filtered?.length / 10));
    const a = filtered.map((item, ind) => {
      return {
        ...item,
        sr: ind + 1,
      };
    });
    return a;
    // return filtered;
  }, [rowData, search]);

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
          <Grid.Col sm={3} ml="auto">
            <DownloadPdf
              headCells={headerData}
              data={filteredItems}
              title={"Scheduled Appointments"}
              label={"Scheduled Appointments"}
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
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={() => {
          CancelAppointments.mutate(reportData?.appointId);
        }}
        loading={CancelAppointments.isLoading}
        label="Are you Sure?"
        message="Do you really want to cancel this appointment?"
      />
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title={translate("Appointment Details")}
      >
        <Flex direction={"column"} align="center" justify={"space-between"}>
          <Avatar
            radius="xl"
            size={150}
            src={reportData?.image}
            className={classes.avatar}
          />
          <Container w={"100%"} ml="md" >
            <SimpleGrid cols={2} spacing="xs" mt={"md"}>
              <Text className={classes.textheading}>{translate("Name")}</Text>
              <Text className={classes.textContent}>{reportData?.name}</Text>
              <Text className={classes.textheading}>{translate("Added By")}</Text>
              <Text className={classes.textContent}>{reportData?.addedBy}</Text>
              <Text className={classes.textheading}>{translate("Case Name")}</Text>
              <Text className={classes.textContent}>
                {reportData?.caseName}
              </Text>
              <Text className={classes.textheading}>{translate("Appointment Date")}</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>{translate("Appointment Time")}</Text>
              <Text className={classes.textContent}>{reportData?.time}</Text>
              <Text className={classes.textheading}>{translate("Status")}</Text>
              <Text className={classes.textContent}>
                <Badge
                  variant="filled"
                  color={
                    reportData?.status === "SCHEDULED" ? "green.0" : "red.0"
                  }
                >
                  {translate(reportData?.status)}
                </Badge>
              </Text>
              {reportData?.refer === "Refered" && (
                <Text className={classes.textheading}>{("Refferal Comment")}</Text>
              )}
              {reportData?.refer === "Refered" && (
                <Text className={classes.textContent}>
                  {reportData?.referedComment}
                </Text>
              )}
            </SimpleGrid>
          </Container>
        </Flex>
        <Group position="right" mt="lg">
          {reportData?.status === "SCHEDULED" && (
            <Button
              label={"Cancel Appointment"}
              onClick={() => {
                setOpenViewModal(false), setOpenDeleteModal(true);
              }}
            />
          )}
        </Group>
      </ViewModal>
    </Container>
  );
}

export default ScheduledAppointments;
