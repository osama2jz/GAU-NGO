import React, { useContext, useState } from "react";
import {
  SimpleGrid,
  Checkbox,
  Container,
  Flex,
  Grid,
  Text,
  Avatar,
  Anchor,
} from "@mantine/core";
import { useStyles } from "../styles";
import { UserInfo } from "../userInformation";
import Table from "../../../../Components/Table";
import ViewModal from "../../../../Components/ViewModal/viewUser";
import { Eye } from "tabler-icons-react";
import InputField from "../../../../Components/InputField";
import userlogo from "../../../../assets/teacher.png";
import SelectMenu from "../../../../Components/SelectMenu";
import { UserContext } from "../../../../contexts/UserContext";
import axios from "axios";
import { backendUrl } from "../../../../constants/constants";
import { useQuery } from "react-query";
import Loader from "../../../../Components/Loader";

const Step2 = ({ selectedUser, caseNo, caseId, setCaseId }) => {
  const { classes } = useStyles();
  const [openViewModal, setOpenViewModal] = useState(false);
  const { user: usertoken, translate } = useContext(UserContext);
  const [reports, setReport] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

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
      id: "reportType",
      numeric: false,
      disablePadding: true,
      label: "Report Type",
      translate: true,
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
      translate: true,
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
    },
    {
      id: "actions",
      view: <Eye color="#4069bf" />,
      numeric: false,
      label: "Actions",
    },
  ];

  const { data: users, status } = useQuery(
    "userReports",
    () => {
      setLoading(true);
      return axios.get(backendUrl + `/api/case/listReportsCaseNo/${caseNo}`, {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let report = {
            id: obj.reportId,
            sr: ind + 1,
            reportType: obj?.reportType === "private" ? "Private" : "Public",
            name: obj?.caseLinkedUser,
            case: obj?.caseNo,
            addedBy: obj?.addedBy,
            date: obj?.addedDate,
            file: `http://report.gauapp.es/reports/${obj.reportFile}`,

            comments: obj?.comments,
            role:
              obj?.role === "lawyer"
                ? "Lawyer"
                : obj?.role === "psychologist"
                ? "Psychologist"
                : "Social Worker",
          };
          return report;
        });

        setReport(data);
        setLoading(false);
      },
      enabled: !!caseNo,
    }
  );

  const filtered = reports.filter(
    (report) =>
      (report.name.toLowerCase().includes(search.toLowerCase()) ||
        report.addedBy.toLowerCase().includes(search.toLowerCase())) &&
      report?.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container size="lg">
      <Text fz={20} fw="bolder" align="center" mb={"md"}>
        {translate("Meeting In Progress")}
      </Text>
      <Flex justify={"space-between"}>
        <Flex align={"center"}>
          <Text fz={18} fw={"bold"}>
            {translate("Case")}#
          </Text>
          <Text ml={10}>{caseNo}</Text>
        </Flex>
      </Flex>
      {/* <Container size="36rem">
        <UserInfo userData={selectedUser} />
      </Container> */}
      <Text align="center" fw={"bold"} mt="xl">
        {translate("Previous Reports")}
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <Container p={"xs"} className={classes.innerContainer}>
          <Grid align={"center"} py="md">
            <Grid.Col sm={6}>
              <InputField
                placeholder="Search By Professional Name"
                leftIcon="search"
                pb="0"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <SelectMenu
                placeholder="Added By"
                data={[
                  { label: "All", value: "" },
                  { label: "Social Worker", value: "socailworker" },
                  { label: "Psychologist", value: "psychologistng" },
                  { label: "Lawyer", value: "lawyer" },
                ]}
                setData={setFilter}
                value={filter}
              />
            </Grid.Col>
          </Grid>
          <Table
            headCells={headerData}
            rowData={filtered}
            setViewModalState={setOpenViewModal}
            setReportData={setReportData}
          />
        </Container>
      )}

      <ViewModal
        opened={openViewModal}
        setOpened={setOpenViewModal}
        title="Report #2345"
      >
        <Grid align="center" justify={"space-between"}>
          <Grid.Col md={4}>
            <Avatar
              radius="xl"
              size={150}
              src={userlogo}
              className={classes.avatar}
            />
          </Grid.Col>
          <Grid.Col md={8} style={{ backgroundColor: "white" }}>
            <Text size={24} weight="bold" mb="sm" align="center">
              {reportData?.name}
            </Text>
            <Container w={"100%"} ml="md">
              <SimpleGrid cols={2} spacing="xs">
                <Text className={classes.textheading}>
                  {translate("Case")} #{" "}
                </Text>
                <Text className={classes.textContent}>{reportData?.case}</Text>
                <Text className={classes.textheading}>
                  {translate("Added By")}
                </Text>
                <Text className={classes.textContent}>
                  {reportData?.addedBy}
                </Text>
                <Text className={classes.textheading}>{translate("Date")}</Text>
                <Text className={classes.textContent}>{reportData?.date}</Text>
                <Text className={classes.textheading}>
                  {translate("Report File")}
                </Text>
                <Anchor href={reportData?.file} target="_blank">
                  {reportData?.reportType} {translate("Report")}
                </Anchor>

                <Text className={classes.textheading}>
                  {translate("Report Type")}
                </Text>
                <Text className={classes.textContent}>
                  {translate(reportData?.reportType)}
                </Text>
              </SimpleGrid>
            </Container>
          </Grid.Col>
        </Grid>
        <Text className={classes.textheading}>
          {translate("Report Comments")}
        </Text>
        <Text>{reportData?.comments}</Text>
      </ViewModal>
    </Container>
  );
};

export default Step2;
