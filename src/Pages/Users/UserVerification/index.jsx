import {
  Container,
  Divider,
  Group,
  Stepper,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useState } from "react";
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
import { useMutation, useQuery } from "react-query";
import { showNotification } from "@mantine/notifications";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { useForm } from "@mantine/form";

export const UserVerification = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [alldata, setAlldata] = useState();
  const [workExperience, setWorkExperience] = useState([]);
  const [refrences, setRefrences] = useState([]);
  const [consentSignature, setConsentSignature] = useState([]);
  const [agreementSignature, setAgreementSignature] = useState([]);
  const [userid, setUserId] = useState("");
  const [userdata, setUserData] = useState("");

  //   const { data, status } = useQuery(
  //   "fetchUserbyId",
  //   () => {
  //     return axios.get(`${backendUrl + `/api/user/listSingleUser/${userid}`}`, {
  //       headers: {
  //         "x-access-token": user.token,
  //       },
  //     });
  //   },
  //   {
  //     onSuccess: (response) => {
  //       setUserData(response.data.data);
  //       // console.log("data", response.data.data);
  //     },
  //   }
  // );

  const handleNextSubmit = () => {
    active < 3 ? setActive(active + 1) : handleVerifyUser.mutate();
  };

  const handleVerifyUser = useMutation(
    () => {
      const values = {
        userId: userid,
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
            familiar: alldata.familiar,
            social: alldata.social,
          },
          workExperience: workExperience,
          consentSignatures: consentSignature,
          agreementSignatures: agreementSignature,
        },
      };
      return axios.post(`${backendUrl + "/api/ngo/verify"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "User Verified",
          message: "User Verify Successfully!",
          color: "green",
        });
        navigate(routeNames.socialWorker.allUsers);
      },
    },
    {
      onError: () => {
        showNotification({
          title: "Error",
          message: "Something Went Wrong!",
          color: "red",
        });
        navigate(routeNames.socialWorker.allUsers);
      },
    }
  );
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      dateOfBirth: "",
      passport: "",
      nationality: "",
      origin: "",
      domicile: "",
      muncipality: "",
      revenue: "",
      expenses: "",
      aidsBonuses: "",
      debt: "",
      housing: "",
      education: "",
      char: "",
      training: "",
      realization: "",
      healthAspects: "",
      socioFamily: "",
      tracking: "",
      demand: "",
      social: "",
      labour: "",
      educational: "",
      institutional: "",
      familiar: "",
    },
    validate: {
      dateOfBirth: (value) =>
        value.length < 1 ? "Please enter your date of Birth" : null,
      age: (value) => (value.length < 1 ? "Please enter your Age" : null),
      passport: (value) => (value.length < 1 ? "Please enter passport" : null),
      nationality: (value) =>
        value.length < 1 ? "Please enter nationality" : null,
      origin: (value) => (value.length < 1 ? "Please enter origin" : null),
      domicile: (value) => (value.length < 1 ? "Please enter domicile" : null),
      muncipality: (value) =>
        value.length < 1 ? "Please enter muncipality" : null,
      revenue: (value) => (value.length < 1 ? "Please enter revenue" : null),
      expenses: (value) => (value.length < 1 ? "Please enter expenses" : null),
      aidsBonuses: (value) =>
        value.length < 1 ? "Please enter Aids or Bonuses" : null,
      debt: (value) => (value.length < 1 ? "Please enter debt" : null),
      housing: (value) => (value.length < 1 ? "Please enter housing" : null),
      education: (value) =>
        value.length < 1 ? "Please enter Education level" : null,
      char: (value) =>
        value.length < 1 ? "Please enter Characteristics" : null,
      training: (value) =>
        value.length < 1 ? "Please enter Complementary Trainging " : null,
      realization: (value) =>
        value.length < 1 ? "Please enter realization year" : null,
      labour: (value) => (value.length < 1 ? "Please enter Labour year" : null),
      educational: (value) =>
        value.length < 1 ? "Please enter educational year" : null,
      institutional: (value) =>
        value.length < 1 ? "Please enter institutional year" : null,
      familiar: (value) =>
        value.length < 1 ? "Please enter familiar year" : null,
      social: (value) => (value.length < 1 ? "Please enter social year" : null),
    },
  });
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
          <Step1 user={userid} setUser={setUserId} />
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
            alldata={alldata}
            workExperience={workExperience}
            setWorkExperience={setWorkExperience}
            refrences={refrences}
            setRefrences={setRefrences}
            userdata={userdata}
            form={form}
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
        {active <2 ? (
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
            disabled={!userid}
          />
        )}
      </Group>
    </Container>
  );
};
