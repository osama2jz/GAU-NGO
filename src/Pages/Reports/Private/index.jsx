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
import { useMemo } from "react";
import Button from "../../../Components/Button";

function PrivateReport() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user,translate } = useContext(UserContext);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfData, setPdfData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [SelectedProject, setSelectedProject] = useState("");

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
      id: "projectName",
      numeric: false,
      disablePadding: true,
      label: "Project",
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
      translate:true
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
            date: new moment(obj.addedDate).format("YYYY-MM-DD"),
            image: obj?.profileImage,
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
            id: obj._id,
            sr: ind + 1,
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
            date: new moment(obj.addedDate).format("YYYY-MM-DD"),
            image: obj?.profileImage,
            projectName: obj?.projectName,
          };
          return appointment;
        });
        setPdfData(data);
      },
    }
  );

  //API call for fetching all projects
  const { data: projects, status: statusProject } = useQuery(
    "fetchProjects",
    () => {
      return axios.get(`${backendUrl + `/api/project/listProjects`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let project = {
            label: obj?.projectName,
            value: obj?.projectName,
          };
          return project;
        });
        setProjectData(data);
      },
    }
  );

  const filterData = useMemo(() => {
    const filtered = pdfData?.filter((item) => {
      if (filter == "") {
        return (
          item?.name.toLowerCase().includes(search.toLowerCase()) ||
          item?.caseNo.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return (
          (item?.name?.toLowerCase().includes(search.toLowerCase()) ||
            item?.caseNo?.toLowerCase().includes(search.toLowerCase())) &&
          item?.projectName?.toLowerCase().includes(filter.toLowerCase())
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
      <ContainerHeader label={"Private"} />
      <Container size={"xl"} p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} py="md">
          <Grid.Col sm={5}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={3} lg={3}>
            <SelectMenu
              placeholder="Projects"
              data={projectData}
              setData={setFilter}
              value={filter}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setSearch("");
                setFilter("");
              }}
            />
          </Grid.Col>

          <Grid.Col sm={3} ml="auto">
            <DownloadPdf
              headCells={headerData}
              data={filterData}
              label={"Private Reports"}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table
            headCells={headerData}
            rowData={paginated}
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
        title={translate("Private Report")}
      >
        <Flex direction="column" align="center" justify={"space-between"}>
          <Avatar
            radius="xl"
            size={150}
            src={reportData?.image || userlogo}
            className={classes.avatar}
          />

       

          <Container w={"100%"} ml="md" >
            <SimpleGrid cols={2} spacing="xs" mt={"md"}>
            <Text className={classes.textheading}>{translate("Name")} </Text>
              <Text className={classes.textContent}>{reportData?.name}</Text>
              <Text className={classes.textheading}>{translate("Case #")} </Text>
              <Text className={classes.textContent}>{reportData?.caseNo}</Text>
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
