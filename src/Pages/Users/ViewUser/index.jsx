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
import ViewUserPersonalInformation from "./UserInformation";
import ConsentForm from "./ConsentForm";
import AgreementForm from "./AgreementForm";
import PrimaryDocuments from "./PrimaryDocuments";

function ViewUser() {
  const { classes } = useStyles();
  const { state } = useLocation();
  const { userData } = state ?? "";
  const { user, translate } = useContext(UserContext);
  const [data, setData] = useState();
  const [docs, setDocs] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const componentRef = useRef();
  const agreementSignatures = useRef();
  const consentSignatures = useRef();
  const [activeTab, setActiveTab] = useState(1);

  const DownloadPdf = () => {
    if (activeTab === 1) {
      printPageArea();
    }
    if (activeTab === 2) {
      consentPrint();
    }
    if (activeTab === 3) {
      agreementPrint();
    }
  };
  const printPageArea = useReactToPrint({
    content: () => componentRef.current,
  });

  const consentPrint = useReactToPrint({
    content: () => consentSignatures.current,
  });

  const agreementPrint = useReactToPrint({
    content: () => agreementSignatures.current,
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
                id: item._id,
                contract: item.contract,
                position: item.position,
                startDate: moment(item.startDate).format("YYYY-MM-DD"),
                endDate: moment(item.endDate).format("YYYY-MM-DD"),
                enterprise: item.enterprise,
                duration: item.duration,
              };
            }
          );
        setDocs(response.data.documents);
        // setWorkData(workData);
        setLoader(false);
      },
      // enabled: !!userData,
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
          label={"User Detail"}
          style={{ marginRight: "auto" }}
        />
      </Flex>
      {activeTab !== 4 && (
        <Group position="right" mt={"md"}>
          <Button
            label={"Generate Pdf"}
            bg={true}
            onClick={() => DownloadPdf()}
          />
        </Group>
      )}

      <Tabs
        mt={"xl"}
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
          <Tabs.Tab value="1" onClick={() => setActiveTab(1)}>
            {translate("Personal Information")}
          </Tabs.Tab>
          <Tabs.Tab value="2" onClick={() => setActiveTab(2)}>
            {translate("Consent Form")}
          </Tabs.Tab>
          <Tabs.Tab value="3" onClick={() => setActiveTab(3)}>
            {translate("Agreement Form")}
          </Tabs.Tab>
          <Tabs.Tab value="4" onClick={() => setActiveTab(4)}>
            {translate("Primary Document")}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="1" pt="xs">
          <ViewUserPersonalInformation componentRef={componentRef} />
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="xs">
          <ConsentForm Data={data} consentSignatures={consentSignatures} />
        </Tabs.Panel>
        <Tabs.Panel value="3" pt="xs">
          <AgreementForm
            Data={data}
            agreementSignatures={agreementSignatures}
          />
        </Tabs.Panel>
        <Tabs.Panel value="4" pt="xs">
          <PrimaryDocuments userDocs={docs} Data={data} loader={loader}/>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default ViewUser;
