import {
  Container,
  Divider,
  Group,
  Stepper,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useStyles } from "./styles";
import step2 from "../../../assets/step2.png";
import step3 from "../../../assets/step3.png";
import step4 from "../../../assets/step4.png";
import step5 from "../../../assets/step5.png";
import Button from "../../../Components/Button";
import { Step2 } from "./Step2";
import { Step1 } from "./Step1";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { useNavigate } from "react-router";
import routeNames from "../../../Routes/routeNames";

export const UserVerification = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const handleNextSubmit = () => {
    active < 4
      ? setActive(active + 1)
      : navigate(routeNames.socialWorker.allUsers);
  };

  return (
    <Container className={classes.userVerification} size="lg">
      <Text fz={32} fw="bolder" align="center" mb={"md"}>
        User Verification
      </Text>
      <Stepper
        active={active}
        color={theme.colors.primary}
        allowNextStepsSelect={false}
        onStepClick={setActive}
      >
        <Stepper.Step
          label="1. Get Started"
          description="Personal Identification"
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
          label="2. Social History Form"
          description="User's Personal History"
        >
          <Step2 />
        </Stepper.Step>
        <Stepper.Step
          icon={
            <img
              src={step3}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="3. Consent Form"
          description="Consent Form"
        >
          <Step3 />
        </Stepper.Step>
        <Stepper.Step
          icon={
            <img
              src={step4}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="4. Agreement"
          description="User Agreement"
        >
          <Step4 />
        </Stepper.Step>
        <Stepper.Step
          icon={
            <img
              src={step5}
              className={classes.stepIcon}
              width="40px"
              alt="icon"
            />
          }
          label="5. Finish"
          description="verified"
        >
          <Step5 />
        </Stepper.Step>
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
