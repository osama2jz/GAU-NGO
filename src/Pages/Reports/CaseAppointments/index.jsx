import {
  Container,
  Flex,
  Grid,
  Image,
  Menu,
  SimpleGrid,
  Text,
  Avatar,
  Anchor,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowNarrowLeft, Edit, Eye, Trash } from "tabler-icons-react";
import download from "../../../assets/download.svg";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import userlogo from "../../../assets/teacher.png";
import { useStyles } from "./styles";
import ContainerHeader from "../../../Components/ContainerHeader";
import Button from "../../../Components/Button";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import Loader from "../../../Components/Loader";
import DownloadPdf from "../downloadPdf";
import ReactHtmlParser from "react-html-parser";
import { useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";

function CaseAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [caseNo, setCaseNo] = useState("");
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editid, setEditId] = useState();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const isMobile = useMediaQuery("(max-width: 820px)");

  const { state } = useLocation();
  const { id,data } = state ?? "";

  

  useEffect(() => {
    if (id) {
      setCaseNo(id);
    }
  }, [id]);

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
    // {
    //   id: "docs",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Missing Documents",
    // },
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

  const { data: users, status } = useQuery(
    ["userCaseProjects", id],
    () => {
      setLoading(true);
      return axios.get(
        backendUrl + `/api/appointment/listUserAppointmentsCaseNo/${id}`,
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        console.log(response);
        let data = response.data.data.map((obj, ind) => {
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
            addedBy: obj?.refered === true ? obj?.referedName : obj?.addedBy,

            role:
              obj?.role === "socialWorker"
                ? "Social Worker"
                : obj.role === "psychologist"
                ? "Psychologist"
                : obj?.role === "ngoadmin"
                ? "NGOAdmin"
                : obj?.role === "user"
                ? "User"
                : "Lawyer",
            appointId: obj?.appointmentId,
            doc: obj?.documents,
            docs: obj?.documents.filter((obj) => obj.documentURL.length < 1)
              .length,
            reportData: obj?.reports,
            image: obj?.appointmentUserImage
              ? obj?.appointmentUserImage
              : userlogo,
          };
          return appointment;
        });

        setRowData(data);
        setLoading(false);
      },
      enabled: !!id,
    }
  );

  const filterData = useMemo(() => {
    const filtered = rowData?.filter((item) => {
      if (filter == "") {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.case.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return (
          (item?.name?.toLowerCase().includes(search.toLowerCase()) ||
            item?.caseNo?.toLowerCase().includes(search.toLowerCase())) &&
          item?.role?.toLowerCase().includes(filter.toLowerCase())
        );
      }
    });
    setPage(1);
    setTotalPages(Math.ceil(filtered?.length / 10));
    let a = filtered.map((obj, ind) => {
      return {
        ...obj,
        sr: ind + 1,
      };
    });

    return a;
  }, [search, filter, rowData]);

  const paginated = useMemo(() => {
    if (activePage === 1) {
      return filterData.slice(0, 10);
    } else {
      return filterData.slice((activePage - 1) * 10, activePage * 10);
    }
  });
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
     <Flex justify="center" align="center">
        <Anchor
          fz={12}
          fw="bolder"
          className={classes.back}
          onClick={() => navigate(-1)}
        >
          <ArrowNarrowLeft />
          <Text>{translate("Back")}</Text>
        </Anchor>
        <ContainerHeader
          label={"Case Appointments"}
          style={{ marginRight: "auto" }}
        />
      </Flex>
      <Text align="center" fw={"normal"} fz={"lg"}>
        {data}
      </Text>
      <Container size={"xl"} p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField
              placeholder="Enter Case No"
              leftIcon="search"
              pb="0"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <Button
              label={"Clear Filter"}
              onClick={() => {
                setSearch("");
              }}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <DownloadPdf
              headCells={headerData}
              setdata={setRowData}
              data={rowData}
              // title="Download reports"
            />
          </Grid.Col>
        </Grid>
        {loading ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={paginated}
            // setViewModalState={setOpenViewModal}
            // setReportData={setReportData}
            setViewModalState={setOpenViewModal}
            setEditIDApp={setEditId}
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
        title={reportData?.type + " " + "Report"}
      >
        <Flex direction={"column"} align="center" justify={"space-between"}>
          <Avatar
            radius="xl"
            size={150}
            src={reportData?.image || userlogo}
            className={classes.avatar}
          />

          <Text size={24} weight="bold" mb="sm" align="center">
            {reportData?.name}
          </Text>
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2} spacing="xs">
              <Text className={classes.textheading}>{translate("Case")} # </Text>
              <Text className={classes.textContent}>{reportData?.case}</Text>
              <Text className={classes.textheading}>{translate("Added By")}</Text>
              <Text className={classes.textContent}>{reportData?.addedBy}</Text>
              <Text className={classes.textheading}>{translate("Date")}</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>{translate("Report File")}</Text>
              {reportData?.file ? (
                <Anchor href={reportData?.file} target="_blank">
                  {translate(reportData?.type)} {translate("Report")}
                </Anchor>
              ) : (
                <Text className={classes.textContent}>{translate("No Report")}</Text>
              )}

              <Text className={classes.textheading}>{translate("Report Type")}</Text>
              <Text className={classes.textContent}>{translate(reportData?.type)}</Text>
            </SimpleGrid>
          </Container>
        </Flex>
      </ViewModal>
    </Container>
  );
}

export default CaseAppointments;
