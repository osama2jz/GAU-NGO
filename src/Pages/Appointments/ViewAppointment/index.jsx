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
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { ArrowNarrowLeft } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import ContainerHeader from "../../../Components/ContainerHeader";
import Table from "../../../Components/Table";
import { useStyles } from "./styles";
import { UserContext } from "../../../contexts/UserContext";

function ViewAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [docData, setDocData] = useState([]);
  const [docData2, setDocData2] = useState([]);

  let { state } = useLocation();

  const { editData } = state ?? "";
  console.log("edit", editData);

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

      let data1 = editData?.doc?.map((obj, ind) => {
        return {
          id: obj?.reportId,
          sr: ind + 1,
          caseNo: editData?.caseNo,
          name: editData?.name,
          docName: obj?.documentName,
          file: obj?.documentURL ? obj?.documentURL : "",
          date: new moment(obj?.createdDate).format("DD-MMM-YYYY"),
        };
      });
      setDocData(data1);
      let data2 = editData?.attachedDocuments?.map((obj, ind) => {
        return {
          id: obj?._id,
          sr: ind + 1,
          docName: obj?.attachedDocument.documentTitle,
          file: obj?.attachedDocument.documentURL,
        };
      });
      setDocData2(data2);
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
  let headerData2 = [
    {
      id: "sr",
      numeric: true,
      disablePadding: true,
      label: "Sr #",
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
              <Text>{translate("Back")}</Text>
            </Anchor>
          </Flex>
          <Grid align="center" justify={"space-between"}>
            <Grid.Col md={4} className={classes.avatar}>
              <Avatar
                radius="xl"
                size={150}
                src={editData?.image || userlogo}
              />
            </Grid.Col>
            <Grid.Col md={8} style={{ backgroundColor: "white" }}>
              <Container w={"100%"} ml="md" p="0px">
                <SimpleGrid cols={2} spacing="xs">
                  <Text className={classes.textheading}>
                    {translate("User Name")}
                  </Text>
                  <Text className={classes.textContent}>{editData?.name}</Text>
                  <Text className={classes.textheading}>
                    {translate("Appointment With")}
                  </Text>
                  <Text className={classes.textContent}>
                    {editData?.appointmentWith}
                  </Text>
                  <Text className={classes.textheading}>
                    {translate("Added By")}
                  </Text>
                  <Text className={classes.textContent}>
                    {editData?.addedBy}
                  </Text>
                  {user.role !== "User" && (
                    <>
                      <Text className={classes.textheading}>
                        {translate("Case #")}
                      </Text>
                      <Text className={classes.textContent}>
                        {editData?.caseNo}
                      </Text>
                      <Text className={classes.textheading}>
                        {translate("Case Name")}
                      </Text>
                      <Text className={classes.textContent}>
                        {editData?.caseName}
                      </Text>
                    </>
                  )}

                  <Text className={classes.textheading}>
                    {translate("Appointment Date")}
                  </Text>
                  <Text className={classes.textContent}>{editData?.date}</Text>
                  <Text className={classes.textheading}>
                    {translate("Appointment Time")}
                  </Text>
                  <Text className={classes.textContent}>{editData?.time}</Text>
                  <Text className={classes.textheading}>
                    {translate("Status")}
                  </Text>
                  <Text className={classes.textContent}>
                    <Badge
                      variant="filled"
                      color={
                        editData?.status === "SCHEDULED" ||
                        editData?.status === "INPROGRESS"
                          ? "green.0"
                          : "red.0"
                      }
                    >
                      {translate(editData?.status)}
                    </Badge>
                  </Text>
                  {editData?.otherPersonName && (
                    <>
                      <Text className={classes.textheading}>
                        {translate("Attended Person Name")}
                      </Text>
                      <Text className={classes.textContent}>
                        {editData?.otherPersonName}
                      </Text>
                      <Text className={classes.textheading}>
                        {translate("Attended Person ID")}
                      </Text>
                      <Text className={classes.textContent}>
                        {editData?.otherPersonId}
                      </Text>
                      <Text className={classes.textheading}>
                        {translate("Attended Person Contact")}
                      </Text>
                      <Text className={classes.textContent}>
                        {editData?.otherPersonMobile}
                      </Text>
                    </>
                  )}
                  {editData?.otherPersonImage && (
                    <>
                      <Text className={classes.textheading}>
                        {translate("Attended Person Image")}
                      </Text>
                      <Anchor href={editData?.otherPersonImage} target="_blank">
                        {translate("View Image")}
                      </Anchor>
                    </>
                  )}
                </SimpleGrid>
              </Container>
            </Grid.Col>
          </Grid>

          <Divider color="#C8C8C8" mt="md" mb="md" />

          <Tabs
            variant="pills"
            defaultValue={"1"}
            color={"blue.0"}
            classNames={{
              root: classes.tab,
              tabsList: classes.tabList,
              tab: classes.tabs,
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="1">{translate("Reports")}</Tabs.Tab>
              <Tabs.Tab value="2">{translate("Uploaded Documents")}</Tabs.Tab>
              <Tabs.Tab value="3">{translate("User Documents")}</Tabs.Tab>
              <Tabs.Tab value="4">{translate("Appointment With")}</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="1" pt="xs">
              <Table headCells={headerData} rowData={rowData} />
            </Tabs.Panel>

            <Tabs.Panel value="2" pt="xs">
              <Table headCells={headerData1} rowData={docData} />
            </Tabs.Panel>
            <Tabs.Panel value="3" pt="xs">
              <Table headCells={headerData2} rowData={docData2} />
            </Tabs.Panel>
            <Tabs.Panel value="4" pt="xs">
              <Divider color="#C8C8C8" mt="md" mb="md" />
              <Container ml="md" p="10px">
                <Grid align="center" justify={"space-between"}>
                  <Grid.Col md={4} className={classes.avatar}>
                    <Avatar
                      radius="xl"
                      size={150}
                      src={editData?.appointmentWithImage || userlogo}
                    />
                  </Grid.Col>
                  <Grid.Col md={8} style={{ backgroundColor: "white" }}>
                    <Container w={"100%"} ml="md" p="10px" >
                      <SimpleGrid cols={2} spacing="xs">
                        <Text className={classes.textheading}>
                          {translate("Name")}
                        </Text>
                        <Text className={classes.textContent}>
                          {editData?.appointmentWith}
                        </Text>
                        <Text className={classes.textheading}>
                          {translate("Role")}
                        </Text>
                        <Text className={classes.textContent}>
                          {editData?.role}
                        </Text>

                        <Text className={classes.textheading}>
                          {translate("Appointment Date")}
                        </Text>
                        <Text className={classes.textContent}>
                          {editData?.date}
                        </Text>
                        <Text className={classes.textheading}>
                          {translate("Appointment Time")}
                        </Text>
                        <Text className={classes.textContent}>
                          {editData?.time}
                        </Text>
                        <Text className={classes.textheading}>
                          {translate("Status")}
                        </Text>
                        <Text className={classes.textContent}>
                          <Badge
                            variant="filled"
                            color={
                              editData?.status === "SCHEDULED" ||
                              editData?.status === "INPROGRESS"
                                ? "green.0"
                                : "red.0"
                            }
                          >
                            {translate(editData?.status)}
                          </Badge>
                        </Text>
                      </SimpleGrid>
                    </Container>
                  </Grid.Col>
                </Grid>
              </Container>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Container>
    </Container>
  );
}

export default ViewAppointments;
