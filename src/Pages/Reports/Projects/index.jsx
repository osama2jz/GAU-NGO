import { Container, Grid } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import SelectMenu from "../../../Components/SelectMenu";
import Table from "../../../Components/Table";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";

function Projects() {
  const { classes } = useStyles();
  const [rowData, setRowData] = useState([]);
  const { user } = useContext(UserContext);
  const [filter2, setFilter2] = useState("");
  const [search, setSearch] = useState("");
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let headerData = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr #",
    },
    {
      id: "projectName",
      numeric: false,
      disablePadding: true,
      label: "Project Name",
    },
    {
      id: "createdDate",
      numeric: false,
      disablePadding: true,
      label: "Created Date",
    },
    {
      id: "totalCases",
      numeric: false,
      disablePadding: true,
      label: "Cases",
    },
    {
      id: "totalAppointments",
      numeric: false,
      disablePadding: true,
      label: "Appointments",
    },
    {
      id: "totalUsers",
      numeric: false,
      disablePadding: true,
      label: "Users",
    },
    {
      id: "totalReports",
      numeric: false,
      disablePadding: true,
      label: "Reports",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Project Status",
    },
  ];

  //API call for fetching all projects
  const { data, status } = useQuery(
    "fetchProjectsUsers",
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
            id: obj._id,
            sr: ind + 1,
            projectName: obj?.projectName,
            createdDate: new moment(obj?.createdDate).format("DD MMM YYYY"),
            description: obj?.description,
            totalAppointments: obj?.totalAppointments,
            totalCases: obj?.totalCases,
            totalUsers: obj?.totalUsers,
            totalReports: obj?.totalReports,
            accStatus: obj?.status,
            status:
              obj?.projectStatus === "inprogress" ? "inprogress" : "completed",
          };
          return project;
        });
        setRowData(data);
      },
    }
  );

  const filteredItems = useMemo(() => {
    let filtered = rowData.filter((item) => {
      if (filter2 === "") {
        return item.projectName.toLowerCase().includes(search.toLowerCase());
      } else {
        return (
          item.projectName.toLowerCase().includes(search.toLowerCase()) &&
          item.status === filter2
        );
      }
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
  }, [rowData, search, filter2]);

  const paginated = useMemo(() => {
    if (activePage == 1) {
      return filteredItems.slice(0, 10);
    } else {
      let a = (activePage - 1) * 10;
      return filteredItems.slice(a, a + 10);
    }
  }, [activePage, filteredItems]);
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
      <ContainerHeader label={"Project Reports"} />
      <Container className={classes.innerContainer} size="xl">
        <Grid align={"center"} py="md">
          <Grid.Col sm={5} lg={4} md={6}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              pb="0"
              onChange={(v) => setSearch(v.target.value)}
              value={search}
            />
          </Grid.Col>

          <Grid.Col sm={6} lg={2} md={3}>
            <SelectMenu
              placeholder="Filter by Status"
              value={filter2}
              setData={setFilter2}
              pb="0px"
              data={[
                { label: "All", value: "" },
                { label: "In Progress", value: "inprogress" },
                { label: "Complete", value: "completed" },
              ]}
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={1} md={3} style={{ textAlign: "end" }}>
            <Button
              label={"Clear Filters"}
              onClick={() => {
                setFilter2("");
                setSearch("");
              }}
            />
          </Grid.Col>
        </Grid>
        {status == "loading" ? (
          <Loader />
        ) : (
          <Table headCells={headerData} rowData={paginated} />
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

export default Projects;
