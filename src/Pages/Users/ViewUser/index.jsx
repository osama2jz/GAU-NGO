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
import { AgeFormAbove } from "./formAbove18";
import { AgeForm } from "./formUnder18";

function ViewUser() {
  const { classes } = useStyles();
  const { state } = useLocation();
  const { userData } = state ?? "";
  const { user, translate } = useContext(UserContext);
  const [data, setData] = useState();
  const [docs, setDocs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [age, setAge] = useState(4);
  const [formsData, setFormsData] = useState();

  const navigate = useNavigate();
  const componentRef = useRef();
  const agreementSignatures = useRef();
  const consentSignatures = useRef();
  const userForm = useRef();
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
    if (activeTab === 5) {
      formPrint();
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

  const formPrint = useReactToPrint({
    content: () => userForm.current,
  });



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
        response?.data?.data?.under18Form
          ? setFormsData(response?.data?.data?.under18Form)
          : setFormsData(response?.data?.data?.over18Form);

        // setWorkData(workData);
        setLoader(false);
      },
      // enabled: !!userData,
    }
  );


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
          {(user.role === "Psychologist" || user.role === "Admin" ) && formsData && (
            <Tabs.Tab value="5" onClick={() => setActiveTab(5)}>
              {translate("Forms")}
            </Tabs.Tab>
          )}
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
          <PrimaryDocuments userDocs={docs} Data={data} loader={loader} />
        </Tabs.Panel>

        <Tabs.Panel value="5" pt="xs">
          {data?.userConsentForm?.personalInformation?.age < 18 ? (
            <AgeForm data={formsData} compRef={userForm}/>
          ) : (
            <AgeFormAbove data={formsData} compRef={userForm}/>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default ViewUser;
