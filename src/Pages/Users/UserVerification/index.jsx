import { Container, Group, Stepper, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import step2 from "../../../assets/step2.png";
import step3 from "../../../assets/step3.png";
import step4 from "../../../assets/step4.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { useStyles } from "./styles";

export const UserVerification = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const sigCanvas = useRef({});
  const sigCanvas2 = useRef({});
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(2);
  const [alldata, setAlldata] = useState();
  const [workExperience, setWorkExperience] = useState([]);
  const [trainingStudies, setTrainingStudies] = useState([]);
  const [refrences, setRefrences] = useState([]);
  const [consentSignature, setConsentSignature] = useState(false);
  const [agreementSignature, setAgreementSignature] = useState(false);
  const [userid, setUserId] = useState("");
  const [userdata, setUserData] = useState("");

  const handleNextSubmit = () => {
    if (active == 0) {
      if (userid) {
        setActive(active + 1);
      } else {
        showNotification({
          title: "Error",
          message: "Please select a user",
          color: "red.0",
        });
      }
    } else if (active == 2) {
      if (sigCanvas.current.isEmpty()) {
        showNotification({
          title: "Error",
          message: "Please sign the consent form",
          color: "red.0",
        });
      } else {
        setConsentSignature(sigCanvas.current.getTrimmedCanvas().toDataURL());
        setActive(active + 1);
      }
    } else if (active == 3) {
      if (sigCanvas2.current.isEmpty()) {
        showNotification({
          title: "Error",
          message: "Please sign the agreement form",
          color: "red.0",
        });
      } else {
        setAgreementSignature(
          sigCanvas2.current.getTrimmedCanvas().toDataURL()
        );
        setActive(active + 1);
        handleVerifyUser.mutate();
      }
    }
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
            email: alldata.email,
            country: alldata.country,
            age: alldata.age,
            address: alldata.address,
            city: alldata.city,
            demand: alldata.demand,
            documentType: alldata.documentType,
            documentURL: alldata.documentURL,
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
          discriminationVoilence: {
            typeId: alldata.typeId,
            discriminationVoilenceValue: alldata.discriminationVoilenceValue,
          },

          studiesTraining: trainingStudies,
          professionalReferences: refrences,
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
          color: "green.0",
        });
        navigate(routeNames.socialWorker.allUsers);
      },
    },
    {
      onError: () => {
        showNotification({
          title: "Error",
          message: "Something Went Wrong!",
          color: "red.0",
        });
        navigate(routeNames.socialWorker.allUsers);
      },
    }
  );

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      //Personal Information
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNo: "",
      email: "",
      age: "",
      country: "",
      address: "",
      city: "",
      demand: "",
      documentType: "passport",
      documentURL: "",

      //Economic Situation
      revenue: "",
      expenses: "",
      aidsBonuses: "",
      debt: "",
      housing: "",

      //Health Aspects
      healthAspects: "",

      //Socio-Family Situation
      socioFamily: "",

      //Discrimination/Violence
      typeId: "",
      discriminationVoilenceValue: "",
    },
    validate: {
      dateOfBirth: (value) =>
        value.length < 1 ? "Please enter your date of Birth" : null,
      passport: (value) => (value?.length < 1 ? "Please enter passport" : null),
      nationality: (value) =>
        value?.length < 1 ? "Please enter nationality" : null,
      country: (value) => (value?.length < 1 ? "Please enter Country" : null),
      address: (value) => (value?.length < 1 ? "Please enter Adress" : null),
      city: (value) => (value?.length < 1 ? "Please enter City" : null),
      revenue: (value) => (value?.length < 1 ? "Please enter revenue" : null),
      expenses: (value) => (value?.length < 1 ? "Please enter expenses" : null),
      aidsBonuses: (value) =>
        value?.length < 1 ? "Please enter Aids or Bonuses" : null,
      debt: (value) => (value?.length < 1 ? "Please enter debt" : null),
      housing: (value) => (value?.length < 1 ? "Please enter housing" : null),
    },
  });

  useEffect(() => {
    form.setFieldValue(
      "age",
      moment(moment()).diff(form.values.dateOfBirth, "years")
    );
  }, [form.values.dateOfBirth]);
  return (
    <Container className={classes.userVerification} size="lg" p={"0px"}>
      <ContainerHeader label={"User Verification"} />
      <Container className={classes.innerContainer} size="xl">
        <Stepper
          active={active}
          color={theme.colors.green}
          allowNextStepsSelect={false}
          breakpoint="md"
          onStepClick={setActive}
          classNames={{
            separator: classes.seperator,
            separatorActive: classes.activeSep,
            stepIcon: classes.stepIcon,
            stepCompletedIcon: classes.stepCompletedIcon,
          }}
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
              trainingStudies={trainingStudies}
              setTrainingStudies={setTrainingStudies}
              userdata={userdata}
              form={form}
              id={userid}
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
            <Step3 sigCanvas={sigCanvas} />
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
            <Step4 sigCanvas={sigCanvas2} />
          </Stepper.Step>
        </Stepper>
        <Group position="center" mt="xl">
          {active < 2 ? (
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
              bg={true}
            />
          )}
        </Group>
      </Container>
    </Container>
  );
};
