import {
  Anchor,
  Avatar,
  Badge,
  Container,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Tabs,
  Text,
} from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { ArrowNarrowLeft } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import ContainerHeader from "../../../Components/ContainerHeader";
import Table from "../../../Components/Table";
import { useStyles } from "./styles";

function ViewAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);
  const [docData, setDocData] = useState([]);

  let { state } = useLocation();

  const { editData } = state ?? "";

  useEffect(() => {
    if (editData) {
      let data = editData?.reportData?.map((obj, ind) => {
        let appointment = {
          id: obj?.reportId,
          sr: ind + 1,
          caseNo: editData?.caseNo,

          name: editData?.name,
          addedBy: obj?.createdBy?.firstName + "" + obj?.createdBy?.lastName,
          role:
            obj?.role === "socialWorker"
              ? "Social Worker"
              : obj.role === "psychologist"
              ? "Psychologist"
              : "Lawyer",
          type: obj.reportType === "private" ? "Private" : "Public",
          comments: obj?.reportComments,
          file: obj?.reportFile ? obj?.reportFile : "",
          date: new moment(obj?.createdDate).format("DD-MMM-YYYY"),
        };
        return appointment;
      });
      setRowData(data);

      let data1 = editData?.doc?.map(
        (obj, ind) => {
          // if (obj?.documentURL !== "") {
          let appointment = {
            id: obj?.reportId,
            sr: ind + 1,
            caseNo: editData?.caseNo,
            name: editData?.name,
            docName: obj?.documentName,
            file: obj?.documentURL ? obj?.documentURL : "",
            date: new moment(obj?.createdDate).format("DD-MMM-YYYY"),
          };
          return appointment;
        }
        // }
      );
      let newData = data1.filter((obj) => obj != undefined);
      setDocData(newData);
    }
  }, [editData]);

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
  ];

  let headerData1 = [
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
      id: "docName",
      numeric: false,
      disablePadding: true,
      label: "Document Name",
    },
    {
      id: "file",
      numeric: false,
      disablePadding: true,
      label: "Document File",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
    },
  ];
  return (
    <Container className={classes.addUser} size="xl" p={"0px"} bg={""}>
      <ContainerHeader label={"Appointment Detail"} />
      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Container p="sm">
          <Flex justify={"space-between"}>
            <Anchor
              fz={12}
              fw="bolder"
              className={classes.back}
              onClick={() => navigate(-1)}
            >
              <ArrowNarrowLeft />
              <Text>Back</Text>
            </Anchor>
          </Flex>
          <Grid align="center" justify={"space-between"}>
          <Grid.Col md={4}>
            <Avatar
              radius="xl"
              size={150}
              src={editData?.image || userlogo}
              className={classes.avatar}
            />
          </Grid.Col>
          <Grid.Col md={8} style={{ backgroundColor: "white" }}>
            <Container w={"100%"} ml="md">
              <SimpleGrid cols={2} spacing="xs">
              <Text className={classes.textheading}>User Name</Text>
                <Text className={classes.textContent}>
                  {editData?.name}
                </Text>
                <Text className={classes.textheading}>Added By</Text>
                <Text className={classes.textContent}>
                  {editData?.addedBy}
                </Text>
                <Text className={classes.textheading}>Case #</Text>
                <Text className={classes.textContent}>
                  {editData?.caseNo}
                </Text>
                <Text className={classes.textheading}>Case Name</Text>
                <Text className={classes.textContent}>
                  {editData?.caseName}
                </Text>
                <Text className={classes.textheading}>Appointment Date</Text>
                <Text className={classes.textContent}>{editData?.date}</Text>
                <Text className={classes.textheading}>Appointment Time</Text>
                <Text className={classes.textContent}>{editData?.time}</Text>
                <Text className={classes.textheading}>Status</Text>
                <Text className={classes.textContent}>
                  <Badge
                    variant="filled"
                    color={
                      editData?.status === "SCHEDULED" ||  editData?.status === "INPROGRESS"? "green.0" : "red.0"
                    }
                  >
                    {editData?.status}
                  </Badge>
                </Text>
              </SimpleGrid>
            </Container>
          </Grid.Col>
        </Grid>
        
          <Divider color="#C8C8C8" mt="md" mb="md" />

          <Tabs
            variant="pills"
            defaultValue={"profile"}
            color={"blue.0"}
            classNames={{
              root: classes.tab,
              tabsList: classes.tabList,
              tab: classes.tabs,
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="profile">Reports</Tabs.Tab>
              <Tabs.Tab value="password">Documents</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="profile" pt="xs">
              <Table headCells={headerData} rowData={rowData} />
            </Tabs.Panel>

            <Tabs.Panel value="password" pt="xs">
              {editData?.doc.length < 0 ? (
                <Text>No Documents Found</Text>
              ) : (
                <Table headCells={headerData1} rowData={docData} />
              )}
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Container>
    </Container>
  );
}

export default ViewAppointments;
