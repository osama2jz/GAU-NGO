import {
  Avatar,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import userImage from "../../../../assets/teacher.png";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import Loader from "../../../../Components/Loader";
import SelectMenu from "../../../../Components/SelectMenu";
import ViewModal from "../../../../Components/ViewModal/viewUser";
import { backendUrl, s3Config } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import { UserInfo } from "../userInformation";
import InputMask from "react-input-mask";
import { showNotification } from "@mantine/notifications";

const Step1 = ({
  setSelectedUser,
  setSelectedCase,
  newCase,
  setNewCase,
  img,
  setImg,
  faceID,
  setFaceId,
  id,
  setOtherUserName,
  setotherUserMobile,
  setotherUserId,
  appData,
  projectId,
  setProjectId,
  verifyimg,
  setVerifyImg,
  setVerifyStatus,
  setFileLoader,
  fileLoader,
  User,
}) => {
  const { state } = useLocation();

  const { classes } = useStyles();
  const { user: usertoken, translate } = useContext(UserContext);
  const [user, setUser] = useState();
  const [cases, setCases] = useState([]);
  const [userData, setUserData] = useState([]);
  const [projects, setProjetcs] = useState([]);
  const [identityImage, setIdentityImage] = useState();

  // const { id, appId } = useParams();
  const [showCamera, setShowCamera] = useState(false);
  const [verifyCamera, setVerifyCamera] = useState(false);
  const [goToWhite, setGoToWhite] = useState(false);

  const [disabledIdBtn, setDisabledIdBtn] = useState(false);
  const [disabledCameraBtn, setDisabledCameraBtn] = useState(false);
  const webcamRef = useRef(null);
  const verifyRef = useRef(null);


  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImg(imageSrc);
  }, [webcamRef]);

  const Verifycapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Decode the Base64 string into binary data
    // Convert the Base64 string to a Blob object
    const blob = dataURItoBlob(imageSrc);
    // Create a new URL for the Blob object
    const imageUrl = URL.createObjectURL(blob);
   

    handleFileInput(blob, "public");

    setVerifyImg(imageUrl);
  }, [verifyRef]);

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const extension = mimeString.split("/")[1];
   
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const fileName = "image." + extension;
    const blob = new Blob([arrayBuffer], { type: mimeString });

    blob.name = fileName;
    console.log(blob);
    return blob;
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
    
    var objKey = type + "/" + Date.now() + "/" + file.name;
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

              setVerifyImg(link);

              setFileLoader(false);
            }
          });
        }
      });
    });
  };

  const handleOpenCamera = () => {
    setDisabledIdBtn(true);
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setDisabledIdBtn(false);
    setShowCamera(false);
  };

  let faceio = new faceIO("fioa89bd");

  useEffect(() => {
    if (id) {
      setUser(id);
    }
  }, [id]);

  useEffect(() => {
    faceio = new faceIO("fioa89bd");
  }, [faceio]);

  //Verfity Face ID

  // const handleVerifyFaceId = () => {
  //  console.log("hello")
  // }

  //selected user
  const { data: selectedUser, status: userFetching } = useQuery(
    ["userFetched", user],
    () => {
      return axios.get(backendUrl + `/api/user/listSingleUser/${user}`, {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      cacheTime: 0,
      onSuccess: (response) => {
        setSelectedUser(response);
        setIdentityImage(response?.data?.data?.userConsentForm?.userImage);
      },
      enabled: !!user,
    }
  );

  const handleVerifyFaceId = useMutation(
    () => {
      let obj = {
        sourceImage: verifyimg,
        targetImage: selectedUser?.data?.data?.userConsentForm?.userImage,
      };
      const formData = new FormData();
      formData.append("sourceImage", verifyimg);
      formData.append(
        "targetImage",
        selectedUser?.data?.data?.userConsentForm?.userImage
      );
      return axios.post(`https://face.gauapp.es/index.php`, formData);
    },
    {
      onSuccess: (response) => {
        if (response.data.matched === "True") {
          setVerifyStatus(true);
          showNotification({
            title: translate("Verification Success"),
            message: translate("Face Matched"),
            color: "green.0",
          });
        } else {
          setVerifyStatus(false);
          showNotification({
            title: translate("Verification Failed"),
            message: translate("Face Not Matched"),
            color: "red.0",
          });
        }
      },
    }
  );

  //all users
  const { data: users, status } = useQuery(
    "fetchVerified",
    () => {
      return axios.get(backendUrl + "/api/ngo/listNGOUsers/user/0/0/verified", {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          if (obj.userStatus === "active") {
            let user = {
              value: obj._id.toString(),
              label: obj?.firstName + " " + obj?.lastName,
              email: obj?.email || "",
            };
            return user;
          }
        });
        let newData = data.filter((item) => item !== undefined);
        setUserData(newData);
      },
    }
  );

  //all projects
  const { status: projectsLoading } = useQuery(
    "fetchProjects",
    () => {
      return axios.get(backendUrl + "/api/project/listProjects", {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          if (obj.status === "active") {
            let user = {
              value: obj._id.toString(),
              label: obj?.projectName,
            };
            return user;
          }
        });
        let newData = data.filter((item) => item !== undefined);
        setProjetcs(newData);
      },
    }
  );

  

  //user cases
  const { data: casesData, status: casesfetching } = useQuery(
    ["casesFetched", user, projectId],
    () => {
      return axios.get(
        backendUrl + `/api/case/listUserCases/${user}/${projectId}`,
        {
          headers: {
            "x-access-token": usertoken?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let casee = {
            value: obj._id,
            label: obj?.caseName,
          };
          return casee;
        });
        setCases(data);
      },
      enabled: !!user && !!projectId,
    }
  );

  const SelectItem = ({ image, label, email, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image || userImage} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {email}
          </Text>
        </div>
      </Group>
    </div>
  );

  const handleVerifyID = async () => {
    setDisabledCameraBtn(true);
    faceio.restartSession();
    setGoToWhite(true);
    try {
      await faceio
        .authenticate({
          locale: "auto", // Default user locale
        })
        .then((userData) => {
          setFaceId(userData.payload);
          setGoToWhite(false);
          // setDisabledCameraBtn(false);
        })
        .finally(() => {
          setGoToWhite(false);
          setDisabledCameraBtn(false);
        });
    } catch (error) {
      setGoToWhite(false);
      setDisabledCameraBtn(false);
      console.log("error", error);
    }
  };

  //Camera

  if (status === "loading") {
    return <Loader />;
  }

  if (goToWhite) {
    return <Container h={"100vh"}></Container>;
  }
  return (
    <Flex gap={"md"} direction="column" px={"0px"}>
      <Text fz={20} fw="bolder" align="center">
        {translate("Verify User")}
      </Text>
      {appData?.refer === "Refered" && (
        <>
          <Container>
            <Text align="center" fw={"bold"} fz={"lg"}>
              {translate("Referred Comment")}
            </Text>
            <Text
              style={{
                border: "1px solid #E8E8E8",
                borderRadius: "5px",
                marginLeft: "auto",
                marginRight: "auto",
                boxShadow: "5px 5px 5px #E8E8E8",
              }}
              p={"md"}
              // w={"40rem"}
              align="center"
            >
              {appData?.referedComment}
            </Text>
          </Container>
          <Divider />
        </>
      )}

      <Group>
        {verifyCamera ? (
          <Container>
            {verifyimg === null ? (
              <>
                <Webcam
                  audio={false}
                  mirrored={true}
                  height={250}
                  width={250}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                <Group>
                  <Button
                    onClick={() => setVerifyCamera(false)}
                    label={"Cancel"}
                  />
                  <Button
                    onClick={Verifycapture}
                    bg={true}
                    label={"Capture Photo"}
                  />
                </Group>
              </>
            ) : (
              <Flex direction={"column"} gap="sm">
                <img src={verifyimg} alt="screenshot" />
                <Flex justify={"space-around"}>
                  <Button
                    onClick={() => setVerifyImg(null)}
                    label="Retake"
                    bg={true}
                    loading={fileLoader}
                  />
                  <Button
                    onClick={() => handleVerifyFaceId.mutate()}
                    label="Verify"
                    loading={fileLoader}
                    bg={true}
                  />
                </Flex>
              </Flex>
            )}
          </Container>
        ) : (
          <Button
            label={"Verify FaceID"}
            onClick={() => setVerifyCamera(true)}
            // disabled={(Object.keys(faceID).length === 0)!==true}
            leftIcon="faceid"
            iconWidth="24px"
            styles={{
              width: "250px",
              fontSize: "22px",
              height: "46px",
              margin: "auto",
            }}
            bg={true}
            disabled={disabledCameraBtn}
          />
        )}

        <Divider
          label="OR"
          labelPosition="center"
          orientation="vertical"
          color={"rgb(0,0,0,0.5)"}
          // my="md"
        />
        {showCamera && (
          <Flex direction={"column"}>
            <InputField
              label={"Person Name"}
              onChange={(e) => setOtherUserName(e.target.value)}
            />
            <InputField
              label={"Person Contact"}
              placeholder="+34 21 4564 790"
              component={InputMask}
              mask="+34 99 9999 999"
              onChange={(e) => setotherUserMobile(e.target.value)}
            />
            <InputField
              label={"Person ID"}
              onChange={(e) => setotherUserId(e.target.value)}
            />
          </Flex>
        )}
        {showCamera ? (
          <Container>
            {img === null ? (
              <>
                <Webcam
                  audio={false}
                  mirrored={true}
                  height={250}
                  width={250}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                <Group>
                  <Button onClick={handleCloseCamera} label={"Cancel"} />
                  <Button onClick={capture} bg={true} label={"Capture Photo"} />
                </Group>
              </>
            ) : (
              <Flex direction={"column"} gap="sm">
                <img src={img} alt="screenshot" />
                <Button onClick={() => setImg(null)} label="Retake" bg={true} />
              </Flex>
            )}
          </Container>
        ) : (
          <Button
            label={"Capture Photo"}
            onClick={handleOpenCamera}
            // disabled={(Object.keys(faceID).length === 0)!==true}
            leftIcon="faceid"
            iconWidth="24px"
            styles={{
              width: "230px",
              fontSize: "22px",
              height: "46px",
              margin: "auto",
            }}
            bg={true}
            disabled={disabledCameraBtn}
          />
        )}
      </Group>
      {appData?.project === "N/A" ? (
        <SimpleGrid
          breakpoints={[
            { minWidth: "md", cols: 1 },
            {
              minWidth: "lg",
              cols: selectedUser || selectedUser === "loading" ? 2 : 1,
            },
            { minWidth: "xs", cols: 1 },
          ]}
        >
          <SimpleGrid align={"flex-end"}>
            {usertoken.role !== "User" && (
              <SelectMenu
                searchable={true}
                itemComponent={SelectItem}
                placeholder="Enter User name or Id"
                clearable={true}
                setData={setUser}
                value={user}
                label="Search User"
                data={userData}
                required
              />
            )}
            {projectsLoading !== "loading" && (
              <SelectMenu
                searchable={true}
                placeholder={
                  projects.length < 1
                    ? "No Projects Found"
                    : "Enter Project Name"
                }
                label="Search Project"
                creatable={true}
                setData={setProjectId}
                value={projectId}
                // disabled={newCase.length > 0}
                data={projects}
                required
              />
            )}
            {casesfetching !== "loading" ? (
              <SelectMenu
                searchable={true}
                placeholder={
                  cases.length < 1 ? "No cases found" : "Enter case name or id"
                }
                label="Search User Case"
                creatable={true}
                setData={setSelectedCase}
                disabled={newCase.length > 0 || cases.length < 1}
                data={cases}
                required
              />
            ) : (
              <Loader minHeight="40px" />
            )}
            <Divider
              label="OR"
              labelPosition="center"
              color={"black.0"}
              m="0px"
              p={"0px"}
            />
            <InputField
              label={"Create New Case"}
              placeholder="Enter case name"
              value={newCase}
              pb="0px"
              onChange={(v) => {
                setNewCase(v.target.value);
                setSelectedCase(v.target.value);
              }}
            />
          </SimpleGrid>
          {userFetching === "loading" ? (
            <Loader minHeight="40px" />
          ) : selectedUser ? (
            <Grid mt={30} justify="space-between" align={"center"} ml={"md"}>
              <Grid.Col sm={12} md={12} xs={12} lg={11}>
                <UserInfo userData={selectedUser} loading={userFetching} />
              </Grid.Col>
            </Grid>
          ) : (
            ""
          )}
        </SimpleGrid>
      ) : userFetching == "loading" ? (
        <Loader minHeight={"5vh"} />
      ) : selectedUser ? (
        <Container size={"lg"} p="0px">
          <UserInfo userData={selectedUser} loading={userFetching} />
        </Container>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default Step1;
