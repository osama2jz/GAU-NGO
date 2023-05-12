import { Container, Group, Stepper, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import step2 from "../../../assets/inMeetingIn.png";
import step4 from "../../../assets/referIn.png";
import step1 from "../../../assets/selectUserIn.png";
import step3 from "../../../assets/uploadRepIn.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import { backendUrl, s3Config } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { AgeForm } from "./AgeForm";
import { AgeFormAbove } from "./AgeFormAbove";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { useStyles } from "./styles";
import jsPDF from "jspdf";
import { useEffect } from "react";
import { useForm } from "@mantine/form";

const AddAppointment = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const publicRef = useRef();
  // const { id, appId } = useParams();
  const { user, translate } = useContext(UserContext);
  const { state } = useLocation();
  const { id, appId, appData } = state ?? "";

  const [active, setActive] = useState(0);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedCase, setSelectedCase] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [newCase, setNewCase] = useState("");
  const [slot, setSlot] = useState("");
  const [fileLoader, setFileLoader] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);

  //Camera Image
  const [img, setImg] = useState(null);
  const [verifyimg, setVerifyImg] = useState(null);

  let age = parseInt(
    selectedUser?.data?.data?.userConsentForm?.personalInformation?.age
  );
  let FirstTimeForm =
    selectedUser?.data?.data?.under18Form ||
    selectedUser?.data?.data?.over18Form
      ? false
      : true;
  //Face Io
  const [faceID, setFaceId] = useState({});

  const [privateReportCheck, setPrivateReportCheck] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUserMobile, setotherUserMobile] = useState("");
  const [otherUserId, setotherUserId] = useState("");

  const [userCase, setUserCase] = useState();
  const [projectId, setProjectId] = useState("");

  const [attachedDocs, setAttachedDocs] = useState([]);
  const [firstTime, setFirstTime] = useState(true);

  const editorr = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],

    content: "",
  });

  const editorr2 = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const [reportPublicFiles, setReportFiles] = useState({
    reportTitle: "",
    reportComments: "",
    reportFile: "",
    reportType: "public",
    createdBy: user.id,
  });

  const [privatereportFiles, setPrivateReportFiles] = useState({
    reportTitle: "",
    reportComments: "",
    reportFile: "",
    reportType: "private",
    createdBy: user.id,
  });

  const [otherDocument, setOtherDocument] = useState([]);

  //create case
  const handleCreateCase = useMutation(
    () => {
      let object = {};

      if (
        otherUserId !== "" ||
        otherUserMobile !== "" ||
        otherUserName !== ""
      ) {
        object = {
          previousCaseLinked: false,
          appointmentId: appId,
          caseLinkedUser: id,
          Image: img,
          otherUser: true,
          otherUserId: otherUserId,
          otherUserMobile: otherUserMobile,
          otherUserName: otherUserName,
        };
      } else {
        object = {
          previousCaseLinked: false,
          appointmentId: appId,
          caseLinkedUser: id,
          Image: img,
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
        if (response.data.status) {
          setSelectedCase(response?.data?.data?.caseId);
          setCaseNo(response?.data?.data?.caseNo);
          setUserCase(response?.data?.data?.caseNo);
          setActive(active + 1);
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: theme.colors.red[9],
            timeout: 5000,
          });
        }
      },
    }
  );

  //create UserCase
  const handleCreateUserCase = useMutation(
    () => {
      let object = {};
      if (
        otherUserId !== "" ||
        otherUserMobile !== "" ||
        otherUserName !== ""
      ) {
        if (selectedCase.length > 0 && newCase.length < 1) {
          object = {
            previousCaseLinked: true,
            appointmentId: appId,
            caseLinkedUser: id,
            Image: img,
            otherUser: true,
            otherUserId: otherUserId,
            otherUserMobile: otherUserMobile,
            otherUserName: otherUserName,
            previousCaseLinkedId: selectedCase,
            // projectId: projectId,
          };
        } else {
          object = {
            previousCaseLinked: false,
            appointmentId: appId,
            caseLinkedUser: id,
            Image: img,
            caseName: newCase,
            projectId: projectId,
            otherUser: true,
            otherUserId: otherUserId,
            otherUserMobile: otherUserMobile,
            otherUserName: otherUserName,
          };
        }
      } else {
        if (selectedCase.length > 0 && newCase.length < 1) {
          object = {
            previousCaseLinked: true,
            appointmentId: appId,
            caseLinkedUser: id,
            Image: img,
            previousCaseLinkedId: selectedCase,
            projectId: projectId,
          };
        } else {
          object = {
            previousCaseLinked: false,
            appointmentId: appId,
            caseLinkedUser: id,
            Image: img,
            caseName: newCase,
            projectId: projectId,
          };
        }
      }

      return axios.post(`${backendUrl + "/api/case/create"}`, object, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          setSelectedCase(response?.data?.data?.caseId);
          setCaseNo(response?.data?.data?.caseNo);
          setUserCase(response?.data?.data?.caseNo);
          // setActive(active + 1);
        } else {
          showNotification({
            color: "red.0",
            message: translate(response.data.message),
            title: "Error",
          });
        }
      },
    }
  );

  //create report
  const handleCreateReport = useMutation(
    async () => {
      reportPublicFiles.reportComments = editorr?.getHTML();
      privatereportFiles.reportComments = editorr2?.getHTML();

      const value = {
        caseId: selectedCase,
        reportFiles: [reportPublicFiles, privatereportFiles],
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
          color: "green.0",
          message: translate("Reports submitted Successfully"),
          title: translate("Success"),
        });
        handleUploadDocuments.mutate();
      },
    }
  );

  //Upload Document
  const handleUploadDocuments = useMutation(
    () => {
      const value = {
        caseId: selectedCase,
        otherDocuments: otherDocument,
        attachedDocument: attachedDocs,
      };
      return axios.post(`${backendUrl + "/api/case/otherDocuments"}`, value, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        // showNotification({
        //   color: "green.0",
        //   message: "Documents uploaded Successfully",
        //   title: "Success",
        // });
      },
    }
  );

  const handleNextSubmit = async () => {
    if (active == 0) {
      if (appData?.project === "N/A") {
        if (!selectedUser || selectedCase?.length < 1) {
          showNotification({
            color: "red.0",
            message: translate("Please Select User or Create Case."),
            title: translate("User Case"),
          });

          return;
        }
        if (img === null && verifyStatus) {
          showNotification({
            color: "red.0",
            message: translate("Please Verify Face ID or Attach Photo."),
            title: translate("Face Recognition"),
          });
          return;
        }
        if (
          otherUserName !== "" ||
          otherUserMobile !== "" ||
          otherUserId !== ""
        ) {
          if (
            otherUserName !== "" &&
            otherUserMobile !== "" &&
            otherUserId !== "" &&
            !(img === null && verifyStatus)
          ) {
          } else {
            showNotification({
              color: "red.0",
              message: translate("Please Add Other User Information."),
              title: translate("User Information"),
            });
            return;
          }
        }
      } else {
        if (img === null && !verifyStatus) {
          showNotification({
            color: "red.0",
            message: translate("Please Verify Face ID or Attach Photo."),
            title: translate("Face Recognition"),
          });
          return;
        }
        if (
          otherUserName !== "" ||
          otherUserMobile !== "" ||
          otherUserId !== ""
        ) {
          if (
            otherUserName !== "" &&
            otherUserMobile !== "" &&
            otherUserId !== "" &&
            !(img === null && verifyStatus)
          ) {
          } else {
            showNotification({
              color: "red.0",
              message: "Please Add Other User Information.",
              title: "User Information",
            });
            return;
          }
        }
      }
      appData?.project === "N/A"
        ? handleCreateUserCase.mutate()
        : handleCreateCase.mutate();
      // setActive(active + 1);
    }
    if (active == 2) {
      if (editorr?.getText() === "" || editorr2?.getText() === "") {
        showNotification({
          color: "red.0",
          message: "Please add public and private report for this appointment.",
          title: "Report Missing",
        });
        return;
      }

      await handleReports();
    } else {
      active < 4
        ? setActive(active + 1)
        : navigate(routeNames.socialWorker.allAppointments);
    }
  };

  const handleNextSubmitForFirstTime = async () => {
    if (active == 0) {
      if (appData?.project === "N/A") {
        if (!selectedUser || selectedCase?.length < 1) {
          showNotification({
            color: "red.0",
            message: translate("Please Add Other User Information."),
            title: translate("User Information"),
          });

          return;
        }
        if (img === null && !verifyStatus) {
          showNotification({
            color: "red.0",
            message: translate("Please Verify Face ID or Attach Photo."),
            title: translate("Face Recognition"),
          });
          return;
        }
        if (
          otherUserName !== "" ||
          otherUserMobile !== "" ||
          otherUserId !== ""
        ) {
          if (
            otherUserName !== "" &&
            otherUserMobile !== "" &&
            otherUserId !== "" &&
            !(img === null && verifyStatus)
          ) {
          } else {
            showNotification({
              color: "red.0",
              message: translate("Please Add Other User Information."),
              title: translate("User Information"),
            });
            return;
          }
        }
      } else {
        if (img === null && !verifyStatus) {
          showNotification({
            color: "red.0",
            message: translate("Please Verify Face ID or Attach Photo."),
            title: translate("Face Recognition"),
          });
          return;
        }
        if (
          otherUserName !== "" ||
          otherUserMobile !== "" ||
          otherUserId !== ""
        ) {
          if (
            otherUserName !== "" &&
            otherUserMobile !== "" &&
            otherUserId !== "" &&
            !(img === null && verifyStatus)
          ) {
          } else {
            showNotification({
              color: "red.0",
              message: translate("Please Add Other User Information."),
              title: translate("User Information"),
            });
            return;
          }
        }
      }
      appData?.project === "N/A"
        ? handleCreateUserCase.mutate()
        : handleCreateCase.mutate();
      // setActive(active + 1);
    }
    if (active == 3) {
      if (editorr?.getText() === "" || editorr2?.getText() === "") {
        showNotification({
          color: "red.0",
          message: translate(
            "Please add public and private report for this appointment."
          ),
          title: translate("Report Missing"),
        });
        return;
      }

      await handleReports();
    } else {
      active < 5
        ? setActive(active + 1)
        : navigate(routeNames.socialWorker.allAppointments);
    }
  };

  async function handleGeneratePDF(value, type) {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF();
      const text = value.getHTML();

      doc.text(text, 10, 10);
      const pdfBlob = new Blob([doc.output("blob")], {
        type: `application/pdf`,
      });

      const pdfUrl = URL.createObjectURL(pdfBlob);

      handleFileInput(pdfBlob, type)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const handleFileInput = (file, type) => {
    setFileLoader(true);
    //s3 configs
    // const fileName = file.name;
    // const sanitizedFileName = fileName.replace(/\s+/g, "");
    // setFileError("");
    // setFileUploading(true);
    const aws = new AWS.S3();
    AWS.config.region = s3Config.region;
    // console.log(aws);
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: s3Config.IdentityPoolId,
    });

    AWS.config.credentials.get(function (err) {
      if (err) alert(err);
      // console.log(AWS.config.credentials);
    });
    var bucket = new AWS.S3({
      params: {
        Bucket: s3Config.bucketName,
      },
    });
    var objKey = type + "/" + Date.now() + "/" + file.type;
    var params = {
      Key: objKey,
      ContentType: file.type,
      Body: file,
      ACL: "public-read",
    };
    return new Promise((resolve, reject) => {
      bucket.upload(params, function (err, data) {
        if (err) {
          results.innerHTML = "ERROR: " + err;
          reject(err);
        } else {
          bucket.listObjects(function (err, data) {
            if (err) {
              showNotification({
                title: "Upload Failed",
                message: "Something went Wrong",
                color: "red.0",
              });
              reject(err);
            } else {
              let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
              if (type === "public") {
                setReportFiles({ ...reportPublicFiles, reportFile: link });
              }
              if (type === "private") {
                setPrivateReportFiles({
                  ...privatereportFiles,
                  reportFile: link,
                });
              }
              resolve();
              setFileLoader(false);
            }
          });
        }
      });
    });
  };
  async function handleReports() {
    try {
      showNotification({
        title: translate("In Progress"),
        message: translate("Please wait while we generate reports for you."),
        color: "green.0",
      });
      await handleGeneratePDF(editorr, "public");
      await handleGeneratePDF(editorr2, "private");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (
      privatereportFiles.reportFile !== "" &&
      reportPublicFiles.reportFile !== ""
    ) {
      handleCreateReport.mutate();
      setActive(active + 1);
    }
  }, [privatereportFiles, reportPublicFiles]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      //Parentage Information
      under18Number: "",
      under18Age: "",
      under18Sex: "",
      under18SchoolCourse: "",
      under18LiveWith: "",
      under18Informant: "",
      under18PriorPsychologicalCare: "",

      //Parental Details
      under18ParentalNumber: "",
      under18ParentalAge: "",
      under18ParentalProfession: "",
      under18ParentalDisease: "",

      //Siblings Details
      under18SiblingsNumber: "",
      under18SiblingsAge: "",
      under18SiblingsProfession: "",
      under18SiblingsDisease: "",

      //Consultation Reason
      under18ReasonForConsultation: "",

      //History of Current Problem
      under18StartDate: "",
      under18Duration: "",
      under18PrecipitatingFactors: "",
      under18ImpactOfProblem: "",
      under18Objective: "",

      // Psychological History
      //Backend
      under18Antental: "",
      under18PreviousDevelopment: "",
      under18Environment: "",
      under18Habits: "",

      // Studies and Occupation
      under18EducationLevel: "",
      under18RelationClassMates: "",
      under18RelationshipTeachers: "",
      under18SchoolProblems: "",
      under18CareerAspirations: "",
      under18ExtraCiricularActivities: "",
      under18AttitudeExams: "",
      under18ParentsAttitude: "",

      // Family Relations
      under18MotherName: "",
      under18FatherName: "",
      under18Siblings: "",
      under18DependencyLevel: "",
      under18RelevantFamilyProblems: "",
      under18TimeDedicated: "",
      under18RelationshipBetweenParents: "",
      under18ImportantEvents: "",
      under18ApplicationOfReward: "",

      // Social Relations
      under18Friends: "",
      under18Interact: "",
      under18Difficulties: "",

      //Interests and Motivations
      under18TakesMostTime: "",
      under18HowFun: "",
      under18ComfortableSituations: "",
      under18ImportantPerson: "",
      under18ImportantConcerns: "",
      under18ChangeThings: "",
      //Backend
      under18ExpectFromOthers: "",
      under18GreatestIllusion: "",

      //Sexuality
      under18SexualGames: "",
      under18SexualCurosity: "",
      under18LevelOfSexEducation: "",
      under18SexualDevelopment: "",

      //Obsessive Problems
      under18NotAbleToGetHead: "",
      under18AbsurdUnpleasant: "",
      under18FeelNervous: "",
      under18AvoidThoughts: "",
      under18TaskRepeat: "",

      // under18MajorIllness: "",
      // under18Diseases: "",
      // under18Illness: "",
      // under18PhysicalDiscomfort: "",
      // under18RelevantMedication: "",
      under18PhysicalDescription: "",
      under18BehaviourObservation: "",
    },
    validate: {
      under18Number: (value) =>
        value.length < 1 ? translate("Please enter your Number") : null,
      under18Age: (value) =>
        value.length < 1 ? translate("Please enter your Age") : null,

      under18Sex: (value) =>
        value.length < 1 ? translate("Please enter sex") : null,
      under18SchoolCourse: (value) =>
        value.length < 1 ? translate("Please enter School course") : null,
      under18LiveWith: (value) =>
        value.length < 1 ? translate("Please enter Live With") : null,
      under18Informant: (value) =>
        value.length < 1 ? translate("Please enter Informant") : null,
    },
  });

  const form1 = useForm({
    validateInputOnChange: true,
    initialValues: {
      over18Number: "",
      over18Age: "",
      over18Sex: "",
      over18MaritalStatus: "",
      over18Profession: "",
      over18Studies: "",
      over18Address: "",
      over18Origin: "",
      over18Telephone: "",
      over18Couple: "",
      over18Children: "", //NationalID,ResidentialID,Passport
      over18Informant: "",
      over18PriorPsychologicalCare: "",

      over18ReasonForConsultation: "",

      //not confirmed
      over18StartDate: "",
      over18Duration: "",

      over18PrecipitatingFactors: "",
      over18ImpactOfProblem: "",
      over18Objective: "",

      over18PreviousDevelopment: "",
      over18Environment: "",
      over18Habits: "",

      //Studies and Occupation
      over18Antental: "",
      over18PreviousDevelopmentChildhood: "",
      over18StudiesEnvironment: "",
      over18StudiesHabits: "",
      over18StudiesProfessionalAspirations: "",
      over18StudiesPreviousWorks: "",

      //Mother
      over18MotherName: "",
      over18MotherProfession: "",
      over18MotherAge: "",

      //Father
      over18FatherName: "",
      over18FatherProfession: "",
      over18FatherAge: "",

      over18Siblings: "",

      over18CoupleName: "",
      over18CoupleProfession: "",
      over18CoupleAge: "",

      over18ChildrenName: "",
      over18ChildrenAge: "",

      over18MotherRelation: "",
      over18FatherRelation: "",
      over18BrotherRelation: "",
      over18PartnerRelation: "",
      over18ChildRelation: "",

      over18RelevantFamilyProblems: "",

      //Social Relations
      over18Frequency: "",
      over18Ease: "",
      over18Difficulties: "",
      over18CurrentDisturbance: "",
      over18AnyOneHelp: "",

      //Interests and motivations
      over18TakesMostTime: "",
      over18HowFun: "",
      over18ComfortableSituations: "",
      over18ImportantPerson: "",
      over18ImportantConcerns: "",
      over18ChangeThings: "",
      over18ExpectFromOthers: "",
      over18GreatestIllusion: "",

      //Sexuality
      over18CurrentRelationship: "",
      over18SpecificProblems: "",
      over18GenitalProblems: "",
      over18AreasofCompatibility: "",
      over18AreasofIncompatibility: "",
      over18CommunicationLevel: "",
      over18PreviousIntercourse: "",
      over18ExtraMaritalAffairs: "",

      //Obsessive Problems
      over18NotAbleToGetHead: "",
      over18AbsurdUnpleasant: "",
      over18FeelNervous: "",
      over18AvoidThoughts: "",
      over18TaskRepeat: "",

      //Organic and psychosomatic pathology
      over18MajorIllness: "",
      over18Diseases: "",
      over18Illness: "",
      over18PhysicalDiscomfort: "",
      over18RelevantMedication: "",
      over18PhysicalDescription: "",
      over18BehaviourObservation: "",
    },
    validate: {
      over18Number: (value) =>
        value.length < 1 ? translate("Please enter your Number") : null,
      over18Age: (value) =>
        value.length < 1 ? translate("Please enter your Age") : null,
      over18Sex: (value) =>
        value.length < 1 ? translate("Please enter sex") : null,
      over18MaritalStatus: (value) =>
        value.length < 1 ? translate("Please enter Marital Status") : null,
      over18Profession: (value) =>
        value.length < 1 ? translate("Please enter Profession") : null,
      over18Studies: (value) =>
        value.length < 1 ? translate("Please enter Studies") : null,
      over18Address: (value) =>
        value.length < 1 ? translate("Please enter Address") : null,
      over18Origin: (value) =>
        value.length < 1 ? translate("Please enter Country") : null,
      over18Telephone: (value) =>
        value.length < 1 ? translate("Please enter Telephone") : null,
      over18Couple: (value) =>
        value.length < 1 ? translate("Please enter Couple") : null,
      over18Children: (value) =>
        value.length < 1 ? translate("Please enter Children") : null,
      over18Informant: (value) =>
        value.length < 1 ? translate("Please enter Informant") : null,
    },
  });

  const addMedicalFormUnder18 = useMutation(
    () => {
      let obj = {
        userId: appData.userid,
        under18Form: form.values,
      };
      return axios.post(`${backendUrl + "/api/user/under18"}`, obj, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          setActive(active + 1);
        } else {
          showNotification({
            color: "red.0",
            message: response.data.message,
            title: "Error",
          });
        }
      },
    }
  );

  const addMedicalFormAbove18 = useMutation(
    () => {
      let obj = {
        userId: appData.userid,
        over18Form: form1.values,
      };
      return axios.post(`${backendUrl + "/api/user/over18"}`, obj, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          setActive(active + 1);
        } else {
          showNotification({
            color: "red.0",
            message: response.data.message,
            title: "Error",
          });
        }
      },
    }
  );

  return (
    <Container className={classes.addAppointment} size="xl" p={"0px"}>
      <ContainerHeader label={"Start an Appointment"} />
      {FirstTimeForm ? (
        <Container className={classes.innerContainer} size="xl">
          <Stepper
            breakpoint="md"
            active={active}
            color={theme.colors.green}
            allowNextStepsSelect={false}
            classNames={{
              separator: classes.seperator,
              separatorActive: classes.activeSep,
              // stepIcon: classes.stepIcon,
              stepCompletedIcon: classes.stepCompletedIcon,
            }}
          >
            <Stepper.Step
              icon={
                <img
                  src={step1}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`1. ${translate("Select User")}`}
            >
              <Step1
                setSelectedUser={setSelectedUser}
                setSelectedCase={setSelectedCase}
                newCase={newCase}
                setNewCase={setNewCase}
                img={img}
                setImg={setImg}
                faceID={faceID}
                setFaceId={setFaceId}
                id={id}
                setOtherUserName={setOtherUserName}
                setotherUserMobile={setotherUserMobile}
                setotherUserId={setotherUserId}
                appData={appData}
                setProjectId={setProjectId}
                projectId={projectId}
                setVerifyImg={setVerifyImg}
                verifyimg={verifyimg}
                setVerifyStatus={setVerifyStatus}
                fileLoader={fileLoader}
                setFileLoader={setFileLoader}
              />
            </Stepper.Step>
            {user.role === "Psychologist" && (
              <Stepper.Step
                icon={
                  <img
                    src={step1}
                    className={classes.stepIcon}
                    width="72px"
                    alt="icon"
                  />
                }
                label={translate("Form")}
              >
                {age >= 18 ? (
                  // "h":
                  <AgeFormAbove
                    setActive={setActive}
                    active={active}
                    form={form1}
                    submit={addMedicalFormAbove18.mutate}
                  />
                ) : (
                  <AgeForm
                    setActive={setActive}
                    active={active}
                    form={form}
                    submit={addMedicalFormUnder18.mutate}
                  />
                )}
              </Stepper.Step>
            )}
            <Stepper.Step
              icon={
                <img
                  src={step2}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`2. ${translate("In Meeting")}`}
            >
              <Step2
                selectedUser={selectedUser}
                caseNo={caseNo}
                caseId={selectedCase}
                setCaseId={setSelectedCase}
              />
            </Stepper.Step>
            <Stepper.Step
              icon={
                <img
                  src={step3}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`3. ${translate("Upload Reporting")}`}
            >
              <Step3
                selectedUser={selectedUser}
                caseNo={caseNo}
                setFileLoader={setFileLoader}
                reportFiles={reportPublicFiles}
                setReportFiles={setReportFiles}
                privatereportFiles={privatereportFiles}
                setPrivateReportFiles={setPrivateReportFiles}
                otherDocument={otherDocument}
                setOtherDocument={setOtherDocument}
                setPrivateReportCheck={setPrivateReportCheck}
                privateReportCheck={privateReportCheck}
                editorr={editorr}
                editorr2={editorr2}
                publicRef={publicRef}
                setAttachedDocs={setAttachedDocs}
              />
            </Stepper.Step>
            <Stepper.Step
              icon={
                <img
                  src={step4}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`4. ${translate("Finish")}`}
            >
              <Step5 />
            </Stepper.Step>
            <Stepper.Step
              icon={
                <img
                  src={step4}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label="5. Refer"
            >
              <Step4 caseId={selectedCase} slot={slot} setSlot={setSlot} />
            </Stepper.Step>
          </Stepper>
          {!(user.role === "Psychologist" && active === 1) && (
            <Group position="center" mt="xl">
              {active > 0 && active < 3 && (
                <Button onClick={() => setActive(active - 1)} label="Back" />
              )}
              {active === 4 && (
                <Button
                  onClick={() =>
                    navigate(routeNames.socialWorker.allAppointments)
                  }
                  disabled={privateReportCheck}
                  label="Skip and Finish"
                />
              )}
              <Button
                onClick={handleNextSubmitForFirstTime}
                loading={
                  handleCreateCase.isLoading ||
                  handleCreateReport.isLoading ||
                  fileLoader
                  // fileLoader
                }
                label={
                  active === 4
                    ? "Refer"
                    : active === 5
                    ? "Finish"
                    : "Save & Next"
                }
                bg={true}
              />
            </Group>
          )}
        </Container>
      ) : (
        <Container className={classes.innerContainer} size="xl">
          <Stepper
            breakpoint="md"
            active={active}
            color={theme.colors.green}
            allowNextStepsSelect={false}
            classNames={{
              separator: classes.seperator,
              separatorActive: classes.activeSep,
              // stepIcon: classes.stepIcon,
              stepCompletedIcon: classes.stepCompletedIcon,
            }}
          >
            <Stepper.Step
              icon={
                <img
                  src={step1}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`1. ${translate("Select User")}`}
            >
              <Step1
                setSelectedUser={setSelectedUser}
                setSelectedCase={setSelectedCase}
                newCase={newCase}
                setNewCase={setNewCase}
                img={img}
                setImg={setImg}
                faceID={faceID}
                setFaceId={setFaceId}
                id={id}
                setOtherUserName={setOtherUserName}
                setotherUserMobile={setotherUserMobile}
                setotherUserId={setotherUserId}
                appData={appData}
                setProjectId={setProjectId}
                projectId={projectId}
                setVerifyImg={setVerifyImg}
                verifyimg={verifyimg}
                setVerifyStatus={setVerifyStatus}
                fileLoader={fileLoader}
                setFileLoader={setFileLoader}
              />
            </Stepper.Step>

            <Stepper.Step
              icon={
                <img
                  src={step2}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`2. ${translate("In Meeting")}`}
            >
              <Step2
                selectedUser={selectedUser}
                caseNo={caseNo}
                caseId={selectedCase}
                setCaseId={setSelectedCase}
              />
            </Stepper.Step>
            <Stepper.Step
              icon={
                <img
                  src={step3}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`3. ${translate("Upload Reporting")}`}
            >
              <Step3
                selectedUser={selectedUser}
                caseNo={caseNo}
                setFileLoader={setFileLoader}
                reportFiles={reportPublicFiles}
                setReportFiles={setReportFiles}
                privatereportFiles={privatereportFiles}
                setPrivateReportFiles={setPrivateReportFiles}
                otherDocument={otherDocument}
                setOtherDocument={setOtherDocument}
                setPrivateReportCheck={setPrivateReportCheck}
                privateReportCheck={privateReportCheck}
                editorr={editorr}
                editorr2={editorr2}
                publicRef={publicRef}
                setAttachedDocs={setAttachedDocs}
              />
            </Stepper.Step>
            <Stepper.Step
              icon={
                <img
                  src={step4}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`4. ${translate("Finish")}`}
            >
              <Step5 />
            </Stepper.Step>
            <Stepper.Step
              icon={
                <img
                  src={step4}
                  className={classes.stepIcon}
                  width="72px"
                  alt="icon"
                />
              }
              label={`5. ${translate("Refer")}`}
            >
              <Step4 caseId={selectedCase} slot={slot} setSlot={setSlot} />
            </Stepper.Step>
          </Stepper>

          <Group position="center" mt="xl">
            {active > 0 && active < 3 && (
              <Button onClick={() => setActive(active - 1)} label="Back" />
            )}
            {active === 3 && (
              <Button
                onClick={() =>
                  navigate(routeNames.socialWorker.allAppointments)
                }
                disabled={privateReportCheck}
                label="Skip and Finish"
              />
            )}
            <Button
              onClick={handleNextSubmit}
              loading={
                handleCreateCase.isLoading ||
                handleCreateReport.isLoading ||
                fileLoader
                // fileLoader
              }
              label={
                active === 4 ? "Refer" : active === 5 ? "Finish" : "Save & Next"
              }
              bg={true}
            />
          </Group>
        </Container>
      )}
    </Container>
  );
};

export default AddAppointment;
