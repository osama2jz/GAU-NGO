import {
  Anchor,
  Avatar,
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowNarrowLeft, Eye } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import DownloadPdf from "../downloadPdf";
import { useStyles } from "./styles";
import moment from "moment";
import Pagination from "../../../Components/Pagination";

function ProjectReports() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const { user, translate } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { state } = useLocation();
  const { id ,data} = state ?? "";

  console.log(data);

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
      id: "case",
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
      id: "type",
      numeric: false,
      disablePadding: true,
      label: "Report Type",
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

  const { data: users, status } = useQuery(
    ["projectReports"],
    () => {
      setLoading(true);
      return axios.get(backendUrl + `/api/case/listReportsProjectId/${id}`, {
        headers: {
          "x-access-token": user?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        console.log(response);
        let data = response?.data?.data?.map((obj, ind) => {
          let report = {
            id: obj.reportId,
            sr: ind + 1,
            reportType: obj?.reportType === "private" ? "Private" : "Public",
            name: obj?.caseLinkedUser,
            case: obj?.caseNo,
            addedBy: obj?.addedBy,
            date: moment(obj?.addedDate).format("YYYY-MMM-DD"),
            file: obj?.reportFile,
            comments: obj?.comments,
            image: obj?.profileImage,
            type: obj.reportType === "private" ? "Private" : "Public",
            role:
              obj?.role === "lawyer"
                ? "Lawyer"
                : obj?.role === "psychologist"
                ? "Psychologist"
                : "Social Worker",
          };
          return report;
        });

        setRowData(data);
        setLoading(false);
      },
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
      <Flex justify="center" align="center" >
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
          label={"Project Reports"}
          style={{ marginRight: "auto" }}
        />
      
      </Flex>
      <Text align="center" fw={"normal"} fz={"lg"}>{data}</Text>
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
              title={"Project Reports" }
              label={"Project Reports"}
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
              <Text className={classes.textheading}>{translate("Case #")} </Text>
              <Text className={classes.textContent}>{reportData?.case}</Text>
              <Text className={classes.textheading}>{translate("Added By")}</Text>
              <Text className={classes.textContent}>{reportData?.addedBy}</Text>
              <Text className={classes.textheading}>{translate("Date")}</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>{translate("Report File")}</Text>
              {reportData?.file ? (
                <Anchor href={reportData?.file} target="_blank">
                  {reportData?.type} Report
                </Anchor>
              ) : (
                <Text className={classes.textContent}>{translate("No Report")}</Text>
              )}

              <Text className={classes.textheading}>{translate("Report Type")}</Text>
              <Text className={classes.textContent}>{reportData?.type}</Text>
            </SimpleGrid>
          </Container>
        </Flex>
      </ViewModal>
    </Container>
  );
}

export default ProjectReports;
