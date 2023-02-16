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

const AddAppointment = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [active, setActive] = useState(0);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedCase, setSelectedCase] = useState("");

  const handleNextSubmit = () => {
    console.log(selectedCase)
    if (active == 0 && (!selectedUser || selectedCase.length<1)) {
      showNotification({
        color: "red",
        message: "Please Select User information",
        title: "Incomplete Info",
      });
      return
    }
    if(user.role==="Psychologist"){
      active < 4
      ? setActive(active + 1)
      : navigate(routeNames.socialWorker.allAppointments)
    }
    else{
      active < 3
      ? setActive(active + 1)
      : navigate(routeNames.socialWorker.allAppointments)
    }
  };

  return (
    <Container className={classes.addAppointment} size="lg">
      <ContainerHeader label={" Make an Appointment"} />
      <Stepper
        breakpoint="md"
        active={active}
        color={theme.colors.primary}
        allowNextStepsSelect={false}
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
          <Step1 setSelectedUser={setSelectedUser} setSelectedCase={setSelectedCase}/>
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
          <Step2 selectedUser={selectedUser} />
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
          <Step3 selectedUser={selectedUser} />
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
          <Step4 />
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
            primary={true}
            // disabled={active===0 && !selectedUser}
          />
        </Group>
      )}
    </Container>
  );
};

export default AddAppointment;
