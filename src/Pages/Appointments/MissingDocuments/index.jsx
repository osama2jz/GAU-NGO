import { Container, Grid } from "@mantine/core";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Eye, Upload } from "tabler-icons-react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
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

const MissingDocuments = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
            if (
              obj?.documents.filter((obj) => obj.documentURL.length < 1)
                .length > 0
            ) {
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
            }
          });
        let newNotNull = data.filter((obj) => obj !== undefined);
        setRowData(newNotNull);
        setTotalPages(Math.ceil(newNotNull?.length / 10));
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
      edit: <Upload />,
      numeric: false,
      label: "Actions",
    },
  ];

  const filteredItems = rowData.filter(
    (item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item?.caseNo?.toLowerCase().includes(search.toLowerCase())
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
      <ContainerHeader label={"Missing Documents"} />

      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col xs={5} lg={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col xs={3} lg={2} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setSearch("");
              }}
            />
          </Grid.Col>
          <Grid.Col xs={4} lg={4} style={{ textAlign: "end" }}>
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
          setViewModalState={true}
          setEditIDApp={true}
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
};

export default MissingDocuments;
