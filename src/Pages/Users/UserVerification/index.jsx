import { Container, Group, Stepper, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
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
import { useParams, useLocation } from "react-router-dom";

export const UserVerification = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const sigCanvas = useRef({});
  const sigCanvas2 = useRef({});
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [alldata, setAlldata] = useState();
  const [workExperience, setWorkExperience] = useState([]);
  const [trainingStudies, setTrainingStudies] = useState([]);
  const [refrences, setRefrences] = useState([]);
  const [consentSignature, setConsentSignature] = useState("");
  const [agreementSignature, setAgreementSignature] = useState("");
  const [userid, setUserId] = useState("");
  const [userdata, setUserData] = useState("");
  const [edit, setEdit] = useState(false);

 
  let { state } = useLocation();

  const { editTime } = state ?? "";
  const { editId } = useParams();

  const { data, status } = useQuery(
    "fetchUsertoEditData",
    () => {
      console.log("hello");
      return axios.get(`${backendUrl + `/api/user/listSingleUser/${editId}`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      staleTime: 300000,
      onSuccess: (response) => {
        // console.log("response", response);
        setUserId(response?.data?.data?._id);

        form.setFieldValue(
          "address",
          response?.data?.data?.userConsentForm?.personalInformation?.address
        );
        // form.setFieldValue(
        //   "age",
        //   response?.data?.data?.userConsentForm?.personalInformation?.age
        // );
        form.setFieldValue(
          "city",
          response?.data?.data?.userConsentForm?.personalInformation?.city
        );
        form.setFieldValue(
          "country",
          response?.data?.data?.userConsentForm?.personalInformation?.country
        );
        form.setFieldValue(
          "demand",
          response?.data?.data?.userConsentForm?.personalInformation?.demand
        );
        form.setFieldValue(
          "documentType",
          response?.data?.data?.userConsentForm?.personalInformation
            ?.documentType
        );
        form.setFieldValue(
          "documentURL",
          response?.data?.data?.userConsentForm?.personalInformation
            ?.documentURL
        );
        form.setFieldValue(
          "email",
          response?.data?.data?.userConsentForm?.personalInformation?.email
        );
        form.setFieldValue(
          "firstName",
          response?.data?.data?.userConsentForm?.personalInformation?.firstName
        );
        form.setFieldValue(
          "lastName",
          response?.data?.data?.userConsentForm?.personalInformation?.lastName
        );
        form.setFieldValue(
          "dateOfBirth",
          editId
            ? new Date(
                response?.data?.data?.userConsentForm?.personalInformation?.dateOfBirth
              )
            : new Date()
        );

        form.setFieldValue("phoneNo", response?.data?.data?.phoneNumber);

        //Socio Family Situation
        form.setFieldValue(
          "socioFamily",
          response?.data?.data?.userConsentForm?.socioFamilySituation
            ?.socioFamily
        );

        //Economic Situation
        form.setFieldValue(
          "revenue",
          response?.data?.data?.userConsentForm?.economicSituation?.revenue
        );
        form.setFieldValue(
          "expenses",
          response?.data?.data?.userConsentForm?.economicSituation?.expenses
        );
        form.setFieldValue(
          "aidsBonuses",
          response?.data?.data?.userConsentForm?.economicSituation?.aidsBonuses
        );
        form.setFieldValue(
          "debt",
          response?.data?.data?.userConsentForm?.economicSituation?.debt
        );
        form.setFieldValue(
          "housing",
          response?.data?.data?.userConsentForm?.economicSituation?.housing
        );

        //Health Aspects
        form.setFieldValue(
          "healthAspects",
          response?.data?.data?.userConsentForm?.healthAspects?.healthAspects
        );

        //Refrences
        setRefrences(
          response?.data?.data?.userConsentForm?.professionalReferences
        );

        //Work Experience
        let workData= response?.data?.data?.userConsentForm?.workExperience.map((item,index) => {
          console.log("item", item);
          return  {
            id: item._id,
            contract: item.contract,
            position: item.position,
            startDate: moment(item.startDate).format("YYYY-MM-DD"),
            endDate: moment(item.endDate).format("YYYY-MM-DD"),
            enterprise: item.enterprise,
            duration: item.duration,
          };
          
        });
        console.log("item", workData);
        setWorkExperience(workData);

        // setWorkExperience(
        //   response?.data?.data?.userConsentForm?.workExperience
        // );

        //Training Studies
        setTrainingStudies(
          response?.data?.data?.userConsentForm?.studiesTraining
        );

        //Discrimination Voilence
        form.setFieldValue(
          "discriminationVoilenceValue",
          response?.data?.data?.userConsentForm?.discriminationVoilence
            ?.discriminationVoilenceValue
        );
        form.setFieldValue(
          "typeId",
          response?.data?.data?.userConsentForm?.discriminationVoilence?.typeId
        );
      },
      enabled: !!editId,
    }
  );

  const handleNextSubmit = async () => {
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
        const url = await sigCanvas2.current.getTrimmedCanvas().toDataURL();
        handleVerifyUser.mutate(url);
      }
    }
  };

  const handleVerifyUser = useMutation(
    (url) => {
      let a = moment(moment()).diff(form.values.dateOfBirth, "years");

      const values = {
        userId: userid,
        consentForm: {
          personalInformation: {
            firstName: alldata.firstName,
            lastName: alldata.lastName,
            dateOfBirth: alldata.dateOfBirth,
            email: alldata.email,
            country: alldata.country,
            age: a,
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
          agreementSignatures: url,
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
          title: editId ? "User Update" : "User Verified",
          message: editId
            ? "User Information Update Succesfully!"
            : "User Verify Successfully!",
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
  // useEffect(() => {
  //   if (form?.values?.dateOfBirth)
  //     form.setFieldValue(
  //       "age",
  //       moment(moment()).diff(form.values.dateOfBirth, "years")
  //     );
  // }, [form.values.dateOfBirth]);
  return (
    <Container className={classes.userVerification} size="lg" p={"0px"}>
      <ContainerHeader label={editId ? "Edit User" : "User Verification"} />
      <Container className={classes.innerContainer} size="xl">
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
    </Container>
  );
};
