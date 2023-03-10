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
import Loader from "../../../Components/Loader";
import DownloadPdf from "../downloadPdf";

function ReferalReport() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [caseNo, setCaseNo] = useState("");
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

  console.log(caseNo);

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
    // {
    //   id: "report",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Report #",
    // },
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
      view: <Eye color="#4069bf" />,
      // delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];

  const { data: users, status } = useQuery(
    ["userCaseReports", caseNo],
    () => {
      setLoading(true);
      console.log("hello");
      return axios.get(backendUrl + `/api/case/listReportsCaseNo/${caseNo}`, {
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
            date: obj?.addedDate,
            file: obj?.reportFile,
            comments: obj?.comments,
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
      enabled: !!caseNo,
    }
  );
  return (
    <Container size={"xl"} className={classes.main} p={"0px"}>
      <ContainerHeader label={"Case Reports"} />
      <Container size={"xl"} p={"xs"} className={classes.innerContainer}>
        <Grid align={"center"} py="md">
          <Grid.Col sm={6}>
            <InputField
              placeholder="Enter Case No"
              leftIcon="search"
              pb="0"
              onChange={(e) => setCaseNo(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={3}>
            <Button
              label={"Search Case"}
              bg={true}
              onClick={() => queryClient.invalidateQueries("userCaseReports")}
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
            rowData={rowData}
            setViewModalState={setOpenViewModal}
            setReportData={setReportData}
          />
        )}
      </Container>
      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title={reportData?.type + " " + "Report"}
      >
        <Flex direction={"column"} align="center" justify={"space-between"}>
          {/* <Avatar
              radius="xl"
              size={150}
              src={userlogo}
              className={classes.avatar}
            /> */}

          <Text size={24} weight="bold" mb="sm" align="center">
            {reportData?.name}
          </Text>
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2} spacing="xs">
              <Text className={classes.textheading}>Case # </Text>
              <Text className={classes.textContent}>{reportData?.case}</Text>
              <Text className={classes.textheading}>Added By</Text>
              <Text className={classes.textContent}>{reportData?.addedBy}</Text>
              <Text className={classes.textheading}>Date</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>Report File</Text>
              <Anchor href={reportData?.file} target="_blank">
                {reportData?.type} Report
              </Anchor>

              <Text className={classes.textheading}>Report Type</Text>
              <Text className={classes.textContent}>{reportData?.type}</Text>
            </SimpleGrid>
          </Container>
        </Flex>
        <Text className={classes.textheading} mt="md">
          Report Comments
        </Text>
        <Text>{reportData?.comments}</Text>
      </ViewModal>
    </Container>
  );
}

export default ReferalReport;
