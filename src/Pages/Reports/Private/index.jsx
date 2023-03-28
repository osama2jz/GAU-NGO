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
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Eye, Trash } from "tabler-icons-react";
import download from "../../../assets/download.svg";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import userlogo from "../../../assets/teacher.png";
import { useStyles } from "./styles";
import ContainerHeader from "../../../Components/ContainerHeader";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import { useQuery } from "react-query";
import moment from "moment";
import axios from "axios";
import DownloadPdf from "../downloadPdf";
import Pagination from "../../../Components/Pagination";
import Loader from "../../../Components/Loader";
import ReactHtmlParser from "react-html-parser";

function PrivateReport() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfData, setPdfData] = useState([]);

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
      label: "Name",
    },
    {
      id: "caseNo",
      numeric: false,
      disablePadding: true,
      label: "Case #",
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
      id: "file",
      numeric: false,
      disablePadding: true,
      label: "Report File",
    },
    {
      id: "actions",
      view: <Eye />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching Private Reports
  const { data, status } = useQuery(
    ["fetchPrivateReportsPDF", activePage],
    () => {
      return axios.get(
        `${
          backendUrl +
          `/api/case/listUserReports/private/${user.id}/${activePage}/10`
        }`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.data.map((obj, ind) => {
          let appointment = {
            id: obj.reportId,
            sr: (activePage === 1 ? 0 : (activePage - 1) * 10) + (ind + 1),
            caseNo: obj.caseNo,
            name: obj.caseLinkedUser,
            addedBy: obj.addedBy,
            role:
              obj?.role === "socialWorker"
                ? "Social Worker"
                : obj.role === "psychologist"
                ? "Psychologist"
                : "Lawyer",
            type: obj.reportType === "private" ? "Private" : "Public",
            comments: obj.comments,
            file: obj?.reportFile,
            date: new moment(obj.addedDate).format("DD-MMM-YYYY"),
            image: obj?.profileImage ? obj?.profileImage : userlogo,
          };
          return appointment;
        });
        setRowData(data);
        setTotalPages(response?.data?.data?.totalPages);
      },
    }
  );

  //API call for fetching Private Reports
  const { data1, status1 } = useQuery(
    "fetchPrivateReports",
    () => {
      return axios.get(
        `${backendUrl + `/api/case/listUserReports/private/${user.id}/0/0`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.data.map((obj, ind) => {
          let appointment = {
            id: obj.reportId,
            sr: (activePage === 1 ? 0 : (activePage - 1) * 10) + (ind + 1),
            caseNo: obj.caseNo,
            name: obj.caseLinkedUser,
            addedBy: obj.addedBy,
            role:
              obj?.role === "socialWorker"
                ? "Social Worker"
                : obj.role === "psychologist"
                ? "Psychologist"
                : "Lawyer",
            type: obj.reportType === "private" ? "Private" : "Public",
            comments: obj.comments,
            file: obj?.reportFile,
            date: new moment(obj.addedDate).format("DD-MMM-YYYY"),
            image: obj?.profileImage ? obj?.profileImage : userlogo,
          };
          return appointment;
        });
        setPdfData(data);
      },
    }
  );
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
      <ContainerHeader label={"Private"} />
      <Container size={"xl"} p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField placeholder="Search" leftIcon="search" pb="0" />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <SelectMenu
              placeholder="Added By"
              data={[
                { label: "Lawyer", value: "lawyer" },
                { label: "Psychologist", value: "psychologistng" },
                { label: "Social Worker", value: "socailworker" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={3} ml="auto">
            <DownloadPdf
              headCells={headerData}
              setdata={setRowData}
              data={pdfData}
              title="Download reports"
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={rowData}
            setViewModalState={setOpenViewModal}
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
        title="Private Report"
      >
        <Flex direction="column" align="center" justify={"space-between"}>
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
              <Text className={classes.textheading}>Case # </Text>
              <Text className={classes.textContent}>{reportData?.caseNo}</Text>
              <Text className={classes.textheading}>Added By</Text>
              <Text className={classes.textContent}>{reportData?.addedBy}</Text>
              <Text className={classes.textheading}>Date</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>Report File</Text>
              {reportData?.file ? (
                <Anchor href={reportData?.file} target="_blank">
                  {reportData?.type} Report
                </Anchor>
              ) : (
                <Text className={classes.textContent}>No Report</Text>
              )}

              {/* <Text className={classes.textheading}>Report Type</Text>
              <Text className={classes.textContent}>{reportData?.type}</Text> */}
            </SimpleGrid>
          </Container>
        </Flex>
      </ViewModal>
    </Container>
  );
}

export default PrivateReport;
