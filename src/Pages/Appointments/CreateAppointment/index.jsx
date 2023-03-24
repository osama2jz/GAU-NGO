import React, { useContext, useState } from "react";

import step1 from "../../../assets/selectUserIn.png";
import step2 from "../../../assets/inMeetingIn.png";
import step3 from "../../../assets/uploadRepIn.png";
import step4 from "../../../assets/referIn.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import Step1 from "./Step1";

import Step2 from "./Step2";
import { useStyles } from "./styles";

import { Container, Group, Stepper, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import routeNames from "../../../Routes/routeNames";

const AddAppointment = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [active, setActive] = useState(0);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedCase, setSelectedCase] = useState("");
  const [newCase, setNewCase] = useState("");
  const [referedTo, setReferedTo] = useState("");
  const [slot, setSlot] = useState("");
  const [projectId, setProjectId] = useState("");



  const handleNextSubmit = () => {
    if (active == 0) {
      if(user.role !=="User"){
        if (!selectedUser || selectedCase.length < 1) {
          showNotification({
            color: "red.0",
            message: "Please Select User information",
            title: "Incomplete Info",
          });
          return;
        }
      }
     
    }

    setActive(active + 1);
  };

  //create appointment
  const handleCreateAppointment = useMutation(
    () => {
      let object = {};
      if(user.role !=="User"){
      if (selectedCase.length > 0 && newCase.length < 1) {
        object = {
          previousAppointmentLinked: true,
          appointmentUser: selectedUser.data.data._id,
          previousAppointmentLinkedId: selectedCase,
          appointmentWith: referedTo,
          scheduleId: slot,
          projectId:"2",
        };
      } else {
        object = {
          previousAppointmentLinked: false,
          appointmentUser: selectedUser.data.data._id,
          appointmentWith: referedTo,
          scheduleId: slot,
          caseName: newCase,
          projectId:"2",
        };
      }}
      else{
        object = {
          previousAppointmentLinked: false,
          appointmentUser: selectedUser.data.data._id,
          appointmentWith: referedTo,
          scheduleId: slot,
        }
      }

      return axios.post(`${backendUrl + "/api/appointment/create"}`, object, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Appointment Created",
            message: "Appointment Created Successfully",
            color: "green.0",
          });
          navigate(routeNames.socialWorker.allAppointments);
        } else {
          showNotification({
            title: "Error",
            message: response.data.message,
            color: "red.0",
          });
        }
        // console.log(response)
      },
    }
  );

  return (
    <Container className={classes.addAppointment} size="xl" px={"0px"}>
      <ContainerHeader label={" Add Appointment"} />
      <Container className={classes.innerContainer} size="xl">
        <Stepper
          breakpoint="sm"
          active={active}
          color={theme.colors.green}
          allowNextStepsSelect={false}
          classNames={{
            separator: classes.seperator,
            separatorActive: classes.activeSep,
            stepIcon: classes.stepIcon,
            stepCompletedIcon: classes.stepCompletedIcon,
            steps: classes.steps,
          }}
        >
          <Stepper.Step
            icon={
              <img
                src={step1}
                className={classes.stepIcon}
                width="70px"
                alt="icon"
              />
            }
            label={user.role ==="User" ? "1.Personal Information":"1. Select User"}
          >
            <Step1
              setSelectedUser={setSelectedUser}
              setSelectedCase={setSelectedCase}
              newCase={newCase}
              setNewCase={setNewCase}
              setProjectId={setProjectId}
              projectId={projectId}
            />
          </Stepper.Step>

          <Stepper.Step
            icon={
              <img
                src={step2}
                className={classes.stepIcon}
                width="70px"
                alt="icon"
              />
            }
            label="2. Schedule"
          >
            <Step2
              caseId={selectedCase}
              setReferedTo={setReferedTo}
              referedTo={referedTo}
              setSlot={setSlot}
              slot={slot}
              onSubmit={handleCreateAppointment}
            />
          </Stepper.Step>
        </Stepper>

        <Group position="center" mt="xl">
          {active > 0 && (
            <Button onClick={() => setActive(active - 1)} label="Back" />
          )}
          {active === 0 && (
            <Button
              onClick={handleNextSubmit}
              label={"Save & Next"}
              bg={true}
            />
          )}
        </Group>
      </Container>
    </Container>
  );
};

export default AddAppointment;
