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

export const UserVerification = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [active, setActive] = useState(1);

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
        ></Stepper.Step>
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
        />
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
        />
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
        />
      </Stepper>
      <Group position="center" mt="xl">
        {active > 1 && (
          <Button onClick={() => setActive(active - 1)} label="Back" />
        )}
        <Button
          onClick={() => setActive(active + 1)}
          label={active === 5 ? "Finish" : "Save & Next"}
          primary={true}
        />
      </Group>
    </Container>
  );
};
