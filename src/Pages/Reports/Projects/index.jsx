import { Container, Grid } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import ContainerHeader from "../../../Components/ContainerHeader";
import Loader from "../../../Components/Loader";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import Card from "./Card";
import { useStyles } from "./styles";

function Projects() {
  const { classes } = useStyles();
  const [rowData, setRowData] = useState([]);
  const { user } = useContext(UserContext);

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
            title: obj?.projectName,
            createdDate: new moment(obj?.createdDate).format("DD MMM YYYY"),
            description: obj?.description,
            appointments: obj?.totalAppointments,
            cases: obj?.totalCases,
            reports: obj?.totalReports,
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
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
      <ContainerHeader label={"Project Reports"} />
      <Container size={"xl"} p={"xs"} className={classes.innerContainer}>
        {status === "loading" ? (
          <Loader />
        ) : (
          <Grid align={"center"} justify="center">
            {rowData.map((item, index) => (
              <Grid.Col md={"auto"}>
                <Card data={item} />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
