import {
  Anchor,
  Avatar,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Tabs,
  Text,
} from "@mantine/core";
import axios from "axios";
import moment from "moment/moment";
import React, { useContext, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import ContainerHeader from "../../../Components/ContainerHeader";
import Table from "../../../Components/Table";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "../../../Components/Button";
import Loader from "../../../Components/Loader";
import { ArrowNarrowLeft } from "tabler-icons-react";
import { useReactToPrint } from "react-to-print";

function ViewUserPersonalInformation({ componentRef }) {
  const { classes } = useStyles();
  const { state } = useLocation();
  const { userData } = state ?? "";
  const { user, translate } = useContext(UserContext);
  const [data, setData] = useState();
  const [docs, setDocs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [removeAnchor, setRemoveAnchor] = useState(false);
  const navigate = useNavigate();
  // const componentRef = useRef();

  const [workData, setWorkData] = useState([]);

  const printPageArea = useReactToPrint({
    content: () => componentRef.current,
  });

  const downloadPDF = () => {
    const capture = document.getElementById("pdf");
    // setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      // setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  const { data1, status } = useQuery(
    "fetchUsertoViewData",
    () => {
      setLoader(true);
      return axios.get(
        `${backendUrl + `/api/user/listSingleUser/${userData}`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        setData(response?.data?.data);

        //Work Experience
        let workData =
          response?.data?.data?.userConsentForm?.workExperience.map(
            (item, index) => {
              return {
                id: item?._id,
                contract: item?.contract,
                position: item?.position,
                startDate: moment(item?.startDate).format("YYYY-MM-DD"),
                endDate: moment(item?.endDate).format("YYYY-MM-DD"),
                enterprise: item?.enterprise,
                duration: item?.duration,
                noOfYears: item?.noOfYears,
              };
            }
          );
        setDocs(response.data.documents);
        setWorkData(workData);
        setLoader(false);
      },
      enabled: !!userData,
    }
  );

  // console.log(data);
  let headerData = [
    {
      id: "fullName",
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
      id: "phone",
      numeric: false,
      disablePadding: true,
      label: "Phone",
    },
    {
      id: "center",
      numeric: false,
      disablePadding: true,
      label: "Center",
    },
    {
      id: "relation",
      numeric: false,
      disablePadding: true,
      label: "Relation",
    },
  ];
  let headerData2 = [
    {
      id: "position",
      numeric: false,
      disablePadding: true,
      label: "Position",
    },
    {
      id: "contract",
      numeric: false,
      disablePadding: true,
      label: "Job Type",
    },
    {
      id: "enterprise",
      numeric: false,
      disablePadding: true,
      label: "Enterprise",
    },
    {
      id:"noOfYears",
      numeric: false,
      disablePadding: true,
      label: "Years",
    },
    {
      id: "duration",
      numeric: false,
      disablePadding: true,
      label: "Duration",
    },
    {
      id: "startDate",
      numeric: false,
      disablePadding: true,
      label: "Start Date",
    },
    {
      id: "endDate",
      numeric: false,
      disablePadding: true,
      label: "End Date",
    },
  ];
  let headerData3 = [
    {
      id: "educationLevel",
      numeric: false,
      disablePadding: true,
      label: "Education Level",
    },
    {
      id: "specialization",
      numeric: false,
      disablePadding: true,
      label: "Specialization",
    },
    {
      id: "complementaryTraining",
      numeric: false,
      disablePadding: true,
      label: "Complementary Training",
    },
    {
      id: "completionYear",
      numeric: false,
      disablePadding: true,
      label: "Completion Year",
    },
  ];

  return (
    <>
      {/* <Button label={"Download pdf"} onClick={() => downloadPDF()} /> */}

      <Container
        className={classes.addUser}
        id={"pdf"}
        size="xl"
        p={"0px"}
        ref={componentRef}
      >
        {loader ? (
          <Loader />
        ) : (
          <Container className={classes.innerContainer} size="xl">
            <Container className={classes.inputContainer} size="xl">
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Personal Information")}
              </Text>
              <Flex gap={"xl"} justify="space-between">
                <Avatar
                  size={180}
                  radius="xl"
                  // m={"0px"}
                  // p={"0px"}
                  src={
                    data?.profileImage ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
                <SimpleGrid
                  w={"75%"}
                  breakpoints={[
                    { minWidth: "md", cols: 4 },
                    { minWidth: "lg", cols: 4 },
                    { minWidth: "xs", cols: 2 },
                  ]}
                  // breakpoints={[{ maxWidth: "md", cols: 2, spacing: "xl" }]}
                >
                  <Text className={classes.textheading}>
                    {translate("First Name")}
                  </Text>
                  <Text>
                    {data?.userConsentForm?.personalInformation?.firstName}
                  </Text>
                  <Text className={classes.textheading}>
                    {translate("Last Name")}
                  </Text>
                  <Text>
                    {data?.userConsentForm?.personalInformation?.lastName}
                  </Text>
                  <Text className={classes.textheading}>
                    {translate("Email")}
                  </Text>
                  <Text style={{ wordBreak: "break-all" }}>{data?.email}</Text>
                  <Text className={classes.textheading}>
                    {translate("Phone Number")}
                  </Text>
                  <Text>{data?.phoneNumber}</Text>
                  <Text className={classes.textheading}>
                    {translate("Date of Birth")}
                  </Text>
                  <Text>
                    {data?.userConsentForm?.personalInformation?.dateOfBirth?.substring(
                      0,
                      10
                    )}
                  </Text>
                  <Text className={classes.textheading}>
                    {" "}
                    {translate("Identity")}
                  </Text>
                  <Anchor
                    href={
                      data?.userConsentForm?.personalInformation?.documentURL
                    }
                    target={"_blank"}
                  >
                    <Text>
                      {data?.userConsentForm?.personalInformation
                        ?.documentType === "residentialId"
                        ? translate("Residential Id")
                        : data?.userConsentForm?.personalInformation
                            ?.documentType === "passport"
                        ? translate("Passport")
                        : translate("National ID")}
                    </Text>
                  </Anchor>
                  <Text className={classes.textheading}>
                    {translate("Country")}
                  </Text>
                  <Text>
                    {data?.userConsentForm?.personalInformation?.country}
                  </Text>
                  <Text className={classes.textheading}>
                    {translate("City")}
                  </Text>
                  <Text>
                    {data?.userConsentForm?.personalInformation?.city}
                  </Text>
                  <Text className={classes.textheading}>
                    {translate("Address")}
                  </Text>
                  <Text>
                    {data?.userConsentForm?.personalInformation?.address}
                  </Text>
                </SimpleGrid>
              </Flex>
            </Container>

            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Studies and Training")}
              </Text>
              <Table
                headCells={headerData3}
                rowData={data?.userConsentForm?.studiesTraining}
              />
            </Container>

            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Work Experience")}
              </Text>
              <Table headCells={headerData2} rowData={workData} />
            </Container>
            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Discrimination And Voilence")}
              </Text>
              <Text>
                {
                  data?.userConsentForm?.discriminationVoilence
                    ?.discriminationVoilenceValue
                }
              </Text>
            </Container>
            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Professional References")}
              </Text>
              <Table
                headCells={headerData}
                rowData={data?.userConsentForm?.professionalReferences}
              />
            </Container>
            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Socio-Family Situation")}
              </Text>
              <Text>
                {data?.userConsentForm?.socioFamilySituation?.socioFamily}
              </Text>
            </Container>
            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Economic Situation")}
              </Text>
              <SimpleGrid
                breakpoints={[
                  { minWidth: "md", cols: 3 },
                  { minWidth: "lg", cols: 6 },
                  { minWidth: "xs", cols: 2 },
                ]}
              >
                <Text fw="bold">{translate("Revenue")}</Text>
                <Text>{data?.userConsentForm?.economicSituation?.revenue}</Text>
                <Text fw="bold">{translate("Expenses")}</Text>
                <Text>
                  {data?.userConsentForm?.economicSituation?.expenses}
                </Text>
                <Text fw="bold">{translate("Aids or Bonuses")}</Text>
                <Text>
                  {data?.userConsentForm?.economicSituation?.aidsBonuses}
                </Text>
                <Text fw="bold">{translate("Debit")}</Text>
                <Text>{data?.userConsentForm?.economicSituation?.debt}</Text>
                <Text fw="bold">{translate("Housing")}</Text>
                <Text>{data?.userConsentForm?.economicSituation?.housing}</Text>
              </SimpleGrid>
            </Container>
            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Health Aspects")}
              </Text>
              <Text>{data?.userConsentForm?.healthAspects?.healthAspects}</Text>
            </Container>
            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Demand")}
              </Text>
              <Text>{data?.userConsentForm?.personalInformation?.demand}</Text>
            </Container>
            <Container
              className={classes.inputContainer}
              size={"xl"}
              mt="xl"
              p={"md"}
            >
              <Text
                align="center"
                fz={"lg"}
                fw="bold"
                mb="xl"
                bg={"#E9ECEF"}
                p={2.5}
              >
                {translate("Documents")}
              </Text>
              {docs.length ? (
                <ol>
                  {docs.map((obj) => {
                    return (
                      <li>
                        <Anchor href={obj.documentURL} target="_blank" pl="md">
                          {obj.documentTitle}
                        </Anchor>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <Text align="center">{translate("No Document")}</Text>
              )}
            </Container>
          </Container>
        )}
      </Container>
    </>
  );
}

export default ViewUserPersonalInformation;
