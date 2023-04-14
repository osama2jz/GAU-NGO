import { Anchor, Container, Flex, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowNarrowLeft, Eye, Trash } from "tabler-icons-react";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";
import DeleteModal from "../../../Components/DeleteModal";
import DownloadPdf from "../downloadPdf";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import ContainerHeader from "../../../Components/ContainerHeader";

function ProjectCases() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [caseNo, setCaseNo] = useState("");
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [reportData, setReportData] = useState([]);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfData, setPdfData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [close, setClose] = useState(false);

  const { state } = useLocation();
  const { id,data } = state ?? "";

  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr #",
    },

    {
      id: "caseName",
      numeric: false,
      disablePadding: true,
      label: "Case Name",
    },
    {
      id: "case",
      numeric: false,
      disablePadding: true,
      label: "Case #",
    },

    {
      id: "totalAppointments",
      numeric: false,
      disablePadding: true,
      label: "Appointments",
    },
    {
      id: "totalReports",
      numeric: false,
      disablePadding: true,
      label: " Reports",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Created Date",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },

    {
      id: "close",
      numeric: false,
      label: "Close Case",
    },
  ];

  const { data: users, status } = useQuery(
    ["userCaseProjectReports", caseNo],
    () => {
      return axios.get(
        backendUrl + `/api/case/listUserCasesProjectBased/${id}`,
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let report = {
            id: obj.reportId,
            sr: ind + 1,
            case: obj?.caseNo,
            caseName: obj?.caseName,
            status: obj?.status,
            totalAppointments: obj?.totalAppointments,
            totalReports: obj?.totalReports,
            date: new moment(obj?.createdDate).format("YYYY-MMM-DD"),
          };
          return report;
        });

        setPdfData(data);
      },
      // enabled: !!caseNo,
    }
  );

  const { data: closeCase, status: closeCaseStatus } = useQuery(
    "closeCase",
    () => {
      setClose(false);
      return axios.get(backendUrl + `/api/case/close/${deleteID}`, {
        headers: {
          "x-access-token": user?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        console.log(response);
        if (response?.data?.status) {
          showNotification({
            title: "Case Closed",
            message: "Case Closed Successfully",
            color: "green",
          });
          queryClient.invalidateQueries(["userCaseProjectReports", caseNo]);
          setOpenDeleteModal(false);
        } else {
          showNotification({
            title: "Error",
            message: response.data.message,
            color: "red",
          });
        }
      },
      enabled: close,
    }
  );

  const filterData = useMemo(() => {
    const filtered = pdfData?.filter((item) => {
      if (filter == "") {
        return (
          item.caseName.toLowerCase().includes(search.toLowerCase()) ||
          item.case.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return (
          item.caseName.toLowerCase().includes(search.toLowerCase()) ||
          item.case.toLowerCase().includes(search.toLowerCase())
          //     &&
          //   item?.role?.toLowerCase().includes(filter.toLowerCase())
        );
      }
    });
    setPage(1);
    setTotalPages(Math.ceil(filtered?.length / 10));
    let a = filtered?.map((obj, ind) => {
      return {
        ...obj,
        sr: ind + 1,
      };
    });

    return a;
  }, [search, filter, pdfData]);

  const paginated = useMemo(() => {
    if (activePage === 1) {
      return filterData?.slice(0, 10);
    } else {
      return filterData?.slice((activePage - 1) * 10, activePage * 10);
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
          <Text>Back</Text>
        </Anchor>
        <ContainerHeader
          label={"Project Cases"}
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
              placeholder="Search"
              leftIcon="search"
              pb="0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid.Col>

          <Grid.Col sm={3} ml="auto">
            <DownloadPdf
              headCells={headerData}
              data={filterData}
              title="Download reports"
              label={"Project Cases"}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={paginated}
            setViewModalState={true}
            setReportData={setReportData}
            setDeleteData={setDeleteID}
            setDeleteModalState={setOpenDeleteModal}
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
        close={true}
        setDeleteData={setDeleteID}
        onDelete={() => setClose(true)}
        loading={closeCaseStatus === "loading"}
        label="Are you Sure?"
        message="Do you really want to close this case? This process cannot be undone."
      />
    </Container>
  );
}

export default ProjectCases;
