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
import Button from "../../../Components/Button";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import Card from "./Card";
import Loader from "../../../Components/Loader";
import DownloadPdf from "../downloadPdf";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

function Projects() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [caseNo, setCaseNo] = useState("");
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

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
  console.log("rowData", rowData);
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
      <ContainerHeader label={"All Projects"} />
      <Container size={"xl"} p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} justify="center">
          {rowData.map((item, index) => (
            <Grid.Col md={"auto"}>
              <Card data={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default Projects;
