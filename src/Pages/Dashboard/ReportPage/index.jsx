import {
  Anchor,
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Text
} from "@mantine/core";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { ArrowNarrowLeft, Eye } from "tabler-icons-react";
import ContainerHeader from "../../../Components/ContainerHeader";
import Loader from "../../../Components/Loader";
import Pagination from "../../../Components/Pagination";
import Table from "../../../Components/Table";
import ViewModal from "../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import Card from "../Card";
import { useStyles } from "./styles";

const UserPage = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { user, translate } = useContext(UserContext);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [url, setUrl] = useState(`/public`);
  const [loader, setLoader] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [publicount, setpublicCount] = useState();
  const [privatecount, setprivateCount] = useState();

  const [rowData, setRowData] = useState([]);
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
      // delete: <Trash color="red" />,
      numeric: false,
      label: "Actions",
    },
  ];

  //API call for fetching Public Reports
  const { data, status } = useQuery(
    ["fetchPublic", activePage, url],
    () => {
      setLoader(true);
      return axios.get(
        `${
          backendUrl +
          `/api/case/listUserReports` +
          url +
          `/${user.id}/${activePage}/10`
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
        let data = response?.data?.data?.data?.map((obj, ind) => {
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
            case: obj?.caseNo,
            file: obj?.reportFile,
            date: new moment(obj.addedDate).format("DD-MMM-YYYY"),
            comments: obj?.comments,
          };
          return appointment;
        });
        setRowData(data);
        setpublicCount(response?.data?.data?.total);
        console.log("public count", publicount);
        setTotalPages(response?.data?.data?.totalPages);

        setLoader(false);
      },
      enabled: url === `/public` ? true : false,
    }
  );

  //API call for fetching Private Reports
  const { data1, status1 } = useQuery(
    ["fetchPrivate", activePage, url],
    () => {
      setLoader(true);
      return axios.get(
        `${
          backendUrl +
          `/api/case/listUserReports` +
          url +
          `/${user.id}/${activePage}/10`
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
        let data = response?.data?.data?.data?.map((obj, ind) => {
          let appointment = {
            id: obj.reportId,
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
            case: obj?.caseNo,
            file: obj?.reportFile,
            comments: obj?.comments,

            date: new moment(obj.addedDate).format("DD-MMM-YYYY"),
          };
          return appointment;
        });
        setRowData(data);
        setTotalPages(response?.data?.data?.totalPages);
        setLoader(false);
      },
      enabled: url === `/private` ? true : false,
    }
  );
  const { data12, status12 } = useQuery(
    "fetchPrivateCounts",
    () => {
      setLoader(true);
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
        let data = response?.data?.data?.data?.map((obj, ind) => {
          let appointment = {
            id: obj.reportId,
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
            case: obj?.caseNo,
            file: obj?.reportFile,
            comments: obj?.comments,

            date: new moment(obj.addedDate).format("DD-MMM-YYYY"),
          };
          return appointment;
        });
        setprivateCount(response?.data?.data?.total);
        console.log("private count", privatecount);
        setLoader(false);
      },
    }
  );

  const a = [
    {
      title: "PUBLIC",
      value:
        publicount === 0 ? (
          0
        ) : publicount ? (
          publicount
        ) : (
          <Loader minHeight="5vh" />
        ),
      progress: 78,
      color: "#748FFC",
      progressTitle: "Response Rate",
      icon: "reD",
      url: `/public`,
    },
    {
      title: "PRIVATE",
      value:
        privatecount === 0 ? (
          0
        ) : privatecount ? (
          privatecount
        ) : (
          <Loader minHeight="5vh" />
        ),
      progress: 78,
      color: "#A9E34B",
      progressTitle: "Response Rate",
      icon: "reD",
      url: `/private`,
    },
    // {
    //   title: "REFERAL",
    //   value: 0,
    //   progress: 78,
    //   color: "#087F5B",
    //   progressTitle: "Response Rate",
    //   icon: "reD",
    //   url: `/api/case/listUserReports/referal/${user.id}/${activePage}/10`,
    // },
  ];

  return (
    <Container className={classes.main} size="lg">
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
          label={"Reports"}
          style={{ marginRight: "auto" }}
        />
      
      </Flex>
      <Grid>
        {a.map((item, index) => (
          <Grid.Col md={"auto"}>
            <Card data={item} setUrl={setUrl} url={url} />
          </Grid.Col>
        ))}
      </Grid>
      {loader ? (
        <Loader minHeight="40vh" />
      ) : (
        <Container mt="md" size={1095} className={classes.main}>
          <Table
            headCells={headerData}
            rowData={rowData}
            setViewModalState={setOpenViewModal}
            setEditModalState={setOpenEditModal}
            setDeleteModalState={setOpenDeleteModal}
            setReportData={setReportData}
          />
          {totalPages > 1 && (
            <Pagination
              activePage={activePage}
              setPage={setPage}
              total={totalPages}
              radius="xl"
            />
          )}
        </Container>
      )}

      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title={
          reportData?.type === "Private" ? "Private Report" : "Public Report"
        }
      >
        <Flex direction="column" align="center" justify={"space-between"}>
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2} spacing="xs">
              <Text className={classes.textheading}>{translate("User Name")}: </Text>
              <Text className={classes.textContent}>{reportData?.name}</Text>
              <Text className={classes.textheading}>{translate("Case")} # </Text>
              <Text className={classes.textContent}>{reportData?.caseNo}</Text>
              <Text className={classes.textheading}>{translate("Added By")}</Text>
              <Text className={classes.textContent}>{reportData?.addedBy}</Text>
              <Text className={classes.textheading}>{translate("Date")}</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              <Text className={classes.textheading}>{translate("Report File")}</Text>
              <Anchor href={reportData?.file} target="_blank">
                {reportData?.type} {translate("Report")}
              </Anchor>
            </SimpleGrid>
          </Container>
        </Flex>

        <Container w={"100%"} ml="sm" bgr={"initial"} pr={"xl"}>
          <Text className={classes.textheading} mt="md">
            {translate("Report Comments")}
          </Text>

          <Text align="justify">
            {ReactHtmlParser(reportData?.comments)}
          </Text>
        </Container>
      </ViewModal>
    </Container>
  );
};
export default UserPage;
