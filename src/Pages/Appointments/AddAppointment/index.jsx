import React, { useContext, useState } from "react";
import ContainerHeader from "../../../Components/ContainerHeader";
import step2 from "../../../assets/step2.png";
import Button from "../../../Components/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { useStyles } from "./styles";

import {
  Container,
  Group,
  Stepper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import routeNames from "../../../Routes/routeNames";
import { UserContext } from "../../../contexts/UserContext";
import { AgeForm } from "./AgeForm";
import { showNotification } from "@mantine/notifications";
import { backendUrl } from "../../../constants/constants";
import { useMutation } from "react-query";
import axios from "axios";

const AddAppointment = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [active, setActive] = useState(0);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedCase, setSelectedCase] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [newCase, setNewCase] = useState("");
  const [reportFiles, setReportFiles] = useState({
    reportComments: "",
    reportFile: "https://gau0202.s3.amazonaws.com/1122.PNG",
    reportType: "public",
    createdBy: user.id,
  });
  const [privatereportFiles, setPrivateReportFiles] = useState({
    reportComments: "",
    reportFile: "https://gau0202.s3.amazonaws.com/1122.PNG",
    reportType: "private",
    createdBy: user.id,
  });
  // const [referCase, setNewReferCase] = useState();
  // console.log(selectedCase, "selectedCase")
  // console.log(referCase, "referCase")

  //create case
  const handleCreateCase = useMutation(
    () => {
      // if(newCase.length > 0){
      let object = {};
      if (selectedCase.length > 0 && newCase.length < 1) {
        object = {
          previousCaseLinked: true,
          previousCaseLinkedId: selectedCase,
          caseLinkedUser: selectedUser.data.data._id,
        };
      } else {
        object = {
          previousCaseLinked: false,
          caseName: newCase,
          caseLinkedUser: selectedUser.data.data._id,
        };
      }
      return axios.post(`${backendUrl + "/api/case/create"}`, object, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        setSelectedCase(response?.data?.data?.caseId);
        setCaseNo(response?.data?.data?.caseNo);
      },
    }
  );

  //create report
  const handleCreateReport = useMutation(
    () => {
      const value = {
        caseId: selectedCase,
        reportFiles: [reportFiles, privatereportFiles],
      };
      return axios.post(`${backendUrl + "/api/case/caseReports"}`, value, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        showNotification({
          color: "green",
          message: "Reports submitted Successfully",
          title: "Success",
        });
      },
    }
  );

  const handleNextSubmit = () => {
    if (active == 0) {
      if (!selectedUser || selectedCase.length < 1) {
        showNotification({
          color: "red",
          message: "Please Select User information",
          title: "Incomplete Info",
        });
        return;
      } else {
        handleCreateCase.mutate();
      }
    }
    if (active == 2) {
      if (
        reportFiles.reportComments === "" ||
        privatereportFiles.reportComments === ""
      ) {
        showNotification({
          color: "red",
          message: "Please add public and private report for this appointment.",
          title: "Report Missing",
        });
        return;
        // alert("comment is required")
      } else {
        handleCreateReport.mutate();
        setActive(active + 1);
      }
    }
    if (user.role === "Psychologist") {
      active < 4
        ? setActive(active + 1)
        : navigate(routeNames.socialWorker.allAppointments);
    } else {
      active < 3
        ? setActive(active + 1)
        : navigate(routeNames.socialWorker.allAppointments);
    }
  };

  return (
    <Container className={classes.addAppointment} size="xl">
      <ContainerHeader label={" Make an Appointment"} />
      <Container className={classes.innerContainer} size="xl">
      <Stepper
        breakpoint="md"
        active={active}
        color={theme.colors.primary}
        allowNextStepsSelect={false}
        classNames={{
            separator: classes.seperator,
            separatorActive: classes.activeSep,
            stepIcon: classes.stepIcon,
            stepCompletedIcon: classes.stepCompletedIcon
          }}
      >
        <Stepper.Step
          icon={
            <img
              src={step2}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="1. Select User"
        >
          <Step1
            setSelectedUser={setSelectedUser}
            setSelectedCase={setSelectedCase}
            newCase={newCase}
            setNewCase={setNewCase}
          />
        </Stepper.Step>
        {user.role === "Psychologist" && (
          <Stepper.Step
            icon={
              <img
                src={step2}
                className={classes.stepIcon}
                width="40px"
                alt="icon"
              />
            }
            label="Form"
          >
            <AgeForm setActive={setActive} active={active} />
          </Stepper.Step>
        )}
        <Stepper.Step
          icon={
            <img
              src={step2}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="2. In Meeting"
        >
          <Step2 selectedUser={selectedUser} caseNo={caseNo} caseId={selectedCase}/>
        </Stepper.Step>
        <Stepper.Step
          icon={
            <img
              src={step2}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="3. Upload Reporting"
        >
          <Step3
            selectedUser={selectedUser}
            caseNo={caseNo}
            reportFiles={reportFiles}
            setReportFiles={setReportFiles}
            privatereportFiles={privatereportFiles}
            setPrivateReportFiles={setPrivateReportFiles}
          />
        </Stepper.Step>
        <Stepper.Step
          icon={
            <img
              src={step2}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="4. Refer"
        >
          <Step4  caseId={selectedCase}/>
        </Stepper.Step>
      </Stepper>
      {!(user.role === "Psychologist" && active === 1) && (
        <Group position="center" mt="xl">
          {active > 0 && (
            <Button onClick={() => setActive(active - 1)} label="Back" />
          )}
          <Button
            onClick={handleNextSubmit}
            label={
              active === 3 ? "Submit" : active === 4 ? "Finish" : "Save & Next"
            }
            bg={true}
          />
        </Group>
      )}
      </Container>
     

     
    </Container>
  );
};

export default AddAppointment;
