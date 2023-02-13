import React, { useState } from "react";
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
const AddAppointment = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const handleNextSubmit = () => {
    active < 4
      ? setActive(active + 1)
      : navigate(routeNames.socialWorker.allAppointments);
  };

  return (
    <Container className={classes.addAppointment} size="lg">
      <Text fz={32} fw="bolder" align="center" mb={"md"}>
        Make an Appointment
      </Text>
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
          <Step1 />
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
          label="2. In Meeting"
        >
          <Step2 />
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
          <Step3 />
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

        {/* //step 5 commeneted */}
        {/* <Stepper.Step
          icon={
            <img
              src={step2}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="5. Finish"
        >
          <Step5 />
        </Stepper.Step> */}
      </Stepper>

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
        />
      </Group>
    </Container>
  );
};

export default AddAppointment;
