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
import { backendUrl } from "../../../constants/constants";
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

const AddAppointment = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const publicRef = useRef();
  // const { id, appId } = useParams();
  const { user } = useContext(UserContext);
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

  console.log("selectedCase", selectedCase);

  //Camera Image
  const [img, setImg] = useState(null);
  //Face Io
  const [faceID, setFaceId] = useState({});

  const [privateReportCheck, setPrivateReportCheck] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUserMobile, setotherUserMobile] = useState("");
  const [otherUserId, setotherUserId] = useState("");

  const [userCase, setUserCase] = useState();
  const [projectId, setProjectId] = useState("");

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
      console.log("case", caseNo);
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
        // console.log("response", response);
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
      console.log("user Case");
      let object = {};
      if (
        otherUserId !== "" ||
        otherUserMobile !== "" ||
        otherUserName !== ""
      ) {
        if (selectedCase.length > 0 && newCase.length < 1) {
          console.log("Other User Case");

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
        console.log("response", response);
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
    () => {
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

  //Upload Document
  const handleUploadDocuments = useMutation(
    () => {
      const value = {
        caseId: selectedCase,
        otherDocuments: otherDocument,
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

  const handleNextSubmit = () => {
    if (active == 0) {
      if (appData?.project === "N/A") {
        if (!selectedUser || selectedCase?.length < 1) {
          showNotification({
            color: "red.0",
            message: "Please Select User or Create Case.",
            title: "User Case",
          });

          return;
        }
        if (img === null && (Object.keys(faceID).length === 0) === true) {
          showNotification({
            color: "red.0",
            message: "Please Verify Face ID or Attach Photo.",
            title: "Face Recognition",
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
            !(img === null && (Object.keys(faceID).length === 0) === true)
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
      } else {
        if (img === null && (Object.keys(faceID).length === 0) === true) {
          showNotification({
            color: "red.0",
            message: "Please Verify Face ID or Attach Photo.",
            title: "Face Recognition",
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
            !(img === null && (Object.keys(faceID).length === 0) === true)
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
      handleCreateReport.mutate();
      setActive(active + 1);
      // }
    }
    if (user.role === "Psychologist") {
      active < 5
        ? setActive(active + 1)
        : navigate(routeNames.socialWorker.allAppointments);
    } else {
      active < 4
        ? setActive(active + 1)
        : navigate(routeNames.socialWorker.allAppointments);
    }
  };

  return (
    <Container className={classes.addAppointment} size="xl" p={"0px"}>
      <ContainerHeader label={" Start an Appointment"} />
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
            label="1. Select User"
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
              label="Form"
            >
              {age >= 18 ? (
                // "h":
                <AgeFormAbove setActive={setActive} active={active} />
              ) : (
                <AgeForm setActive={setActive} active={active} />
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
            label="2. In Meeting"
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
            label="3. Upload Reporting"
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
            label="4. Finish"
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
                handleCreateCase.isLoading || handleCreateReport.isLoading
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
