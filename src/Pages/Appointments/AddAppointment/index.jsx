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
  const [age, setAge] = useState(19);
  const [fileLoader, setFileLoader] = useState(false);

  

  //Camera Image
  const [img, setImg] = useState(null);
  const [verifyimg, setVerifyImg] = useState(null);
  //Face Io
  const [faceID, setFaceId] = useState({});

  const [privateReportCheck, setPrivateReportCheck] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUserMobile, setotherUserMobile] = useState("");
  const [otherUserId, setotherUserId] = useState("");

  const [userCase, setUserCase] = useState();
  const [projectId, setProjectId] = useState("");

  const [attachedDocs, setAttachedDocs] = useState([]);

  const [verifyStatus, setVerifyStatus] = useState(false);
  console.log("app",appData)

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
            message: response.data.message,
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
          message: "Reports submitted Successfully",
          title: "Success",
        });
        handleUploadDocuments.mutate();
      },
    }
  );

  //Fetch Single User
   //selected user


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
      onSuccess: (response) => {},
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
    if (active == 2) {
      if (editorr?.getText() === "" || editorr2?.getText() === "") {
        showNotification({
          color: "red.0",
          message:translate("Please add public and private report for this appointment."),
          title: translate("Report Missing"),
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
  return (
    <Container className={classes.addAppointment} size="xl" p={"0px"}>
      <ContainerHeader label={"Start an Appointment"} />
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
            label={`3. ${translate("Upload Reports")}`}
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
        {!(user.role === "Psychologist" && active === 1) && (
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
                active === 3 ? "Refer" : active === 4 ? "Finish" : "Save & Next"
              }
              bg={true}
            />
          </Group>
        )}
      </Container>
    </Container>
  );
};

export default AddAppointment;
