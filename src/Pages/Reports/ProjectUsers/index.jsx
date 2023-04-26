import {
  Anchor, Container,
  Flex,
  Grid, Text
} from "@mantine/core";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowNarrowLeft } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import Table from "../../../Components/Table";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import DownloadPdf from "../downloadPdf";
import { useStyles } from "./styles";
import moment from "moment";

function ProjectUsers() {
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
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
    },
    {
      id: "appointment",
      numeric: false,
      disablePadding: true,
      label: "Appointments",
    },
    {
      id: "cases",
      numeric: false,
      disablePadding: true,
      label: "Cases",
    },
  ];

  const { data: users, status } = useQuery(
    ["userCaseReports"],
    () => {
      setLoading(true);
      return axios.get(backendUrl + `/api/project/listProjectUsers/${id}`, {
        headers: {
          "x-access-token": user?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let report = {
            id: obj.reportId,
            sr: ind + 1,
            name: obj?.fullName,
            email: obj?.email,
            cases: obj?.totalCases,
            appointment: obj?.totalAppointments,
            image: obj?.profileImage,
            date:moment(obj?.createdDate).format("YYYY-MMM-DD")
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
      return (
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.caseNo?.toLowerCase().includes(search.toLowerCase())
      );
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
  }, [search, rowData]);

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
          label={"Project Users"}
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
              label={translate("Clear Filter")}
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
              title="Project Users"
              label={"Project Users"}
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
    </Container>
  );
}

export default ProjectUsers;
