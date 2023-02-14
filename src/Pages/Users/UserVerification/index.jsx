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
import ContainerHeader from "../../../Components/ContainerHeader";
import { useMutation } from "react-query";

export const UserVerification = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [alldata, setAlldata] = useState();
  const [workExperience, setWorkExperience] = useState([]);
  const [refrences, setRefrences] = useState([]);
  const [consentSignature, setConsentSignature] = useState([]);
  const [agreementSignature, setAgreementSignature] = useState([]);
  console.log("alldata", alldata);
  console.log(agreementSignature);
  console.log(consentSignature);

  const handleNextSubmit = () => {
    active < 3
      ? setActive(active + 1)
      : (handleVerifyUser.mutate(), navigate(routeNames.socialWorker.allUsers));
  };

  const handleVerifyUser = useMutation(
    () => {
      const values = {
        userId: "63ea12d0a0e1c30014c2475c",
        consentForm: {
          personalInformation: {
            firstName: alldata.firstName,
            lastName: alldata.lastName,
            dateOfBirth: alldata.dateOfBirth,
            passport: alldata.passport,
            nationality: alldata.nationality,
            origin: alldata.origin,
            age: alldata.age,
            domicile: alldata.domicile,
            muncipality: alldata.muncipality,
            demand: alldata.demand,
            tracking: alldata.tracking,
          },
          economicSituation: {
            revenue: alldata.revenue,
            expenses: alldata.expenses,
            aidsBonuses: alldata.aidsBonuses,
            debt: alldata.debt,
            housing: alldata.housing,
          },
          healthAspects: {
            healthAspects: alldata.healthAspects,
          },
          socioFamilySituation: {
            socioFamily: alldata.socioFamily,
          },
          studiesTraining: {
            educationLevel: alldata.education,
            characteristics: alldata.char,
            complementaryTraining: alldata.training,
            realizationYear: alldata.realization,
          },
          professionalReferences: refrences,
          discriminationVoilence: {
            labour: alldata.labour,
            educational: alldata.educational,
            institutional: alldata.institutional,
            familiar:alldata.familiar,
            social: alldata.social
          },
          workExperience: workExperience,
          consentSignatures: consentSignature,
          agreementSignatures: agreementSignature,
        },
      };
      console.log(values)
      // return axios.post(`${backendUrl + "/api/user/create"}`, values, {
      //   headers: {
      //     "x-access-token": user.token,
      //   },
      // });
    }
    // {
    //   onSuccess: (response) => {
    //     navigate(routeNames.socialWorker.allUsers);
    //     showNotification({
    //       title: "User Added",
    //       message: "New User added Successfully!",
    //       color: "green",
    //     });
    //   },
    // }
  );

  return (
    <Container className={classes.userVerification} size="lg">
      <ContainerHeader label={"User Verification"} />
      <Stepper
        active={active}
        color={theme.colors.primary}
        allowNextStepsSelect={false}
        breakpoint="md"
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
          <Step2
            setActive={setActive}
            active={active}
            setAlldata={setAlldata}
            workExperience={workExperience}
            setWorkExperience={setWorkExperience}
            refrences={refrences}
            setRefrences={setRefrences}
          />
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
          <Step3 setConsentSignature={setConsentSignature} />
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
          <Step4 setAgreementSignature={setAgreementSignature} />
        </Stepper.Step>
        {/* <Stepper.Step
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
        </Stepper.Step> */}
      </Stepper>
      <Group position="center" mt="xl">
        {active > 0 && active === 1 ? (
          ""
        ) : (
          <Button onClick={() => setActive(active - 1)} label="Back" />
        )}
        {active === 1 ? (
          ""
        ) : (
          <Button
            onClick={handleNextSubmit}
            label={active === 4 ? "Submit" : "Save & Next"}
            primary={true}
          />
        )}
      </Group>
    </Container>
  );
};
