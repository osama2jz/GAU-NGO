import { Avatar, Card, Container, Group, Text, Flex } from "@mantine/core";

import {
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useQuery } from "react-query";
import Button from "../../../../Components/Button";
import { UserContext } from "../../../../contexts/UserContext";
import SelectMenu from "../../../../Components/SelectMenu";
import { backendUrl, s3Config } from "../../../../constants/constants";
import userImage from "../../../../assets/teacher.png";

import { useStyles } from "../styles";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import Loader from "../../../../Components/Loader";
import Webcam from "react-webcam";
import { showNotification } from "@mantine/notifications";

export const Step1 = ({ user, setUser, img, setImg,setFileLoader,
  fileLoader }) => {
  const { classes } = useStyles();
  // const { id, editId } = useParams();
  const [userData, setUserData] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const matches = useMediaQuery("(min-width: 600px)");
  const [goToWhite, setGoToWhite] = useState(false);

  const { state } = useLocation();
  const { id } = state ?? "";
  const { editId } = state ?? "";
  console.log("user", user)

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Decode the Base64 string into binary data
    // Convert the Base64 string to a Blob object
    const blob = dataURItoBlob(imageSrc);
    // Create a new URL for the Blob object
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);

    handleFileInput(blob, "public");
    setImg(imageUrl);
  }, [webcamRef]);

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    console.log(byteString);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const extension = mimeString.split("/")[1];
    console.log(mimeString);
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
    console.log(file);
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
              console.log("link",link);
              setImg(link);

              setFileLoader(false);
            }
          });
        }
      });
    });
  };

  const { user: usertoken } = useContext(UserContext);
  let faceio = new faceIO("fioa89bd");

  const handleOpenCamera = () => {
    user===null? 
    showNotification({
      title: "Select User",
      message: "Please first Select User",
      color: "red.0",
    })
    :setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  useEffect(() => {
    faceio = new faceIO("fioa89bd");
  }, [faceio]);

  useEffect(() => {
    if (id) {
      setUser(id);
    }
  }, [id, editId]);

  const { data: users, status } = useQuery(
    "fetchVerified",
    () => {
      var link = editId
        ? "/api/ngo/listNGOUsers/user/0/0/verified"
        : "/api/ngo/listNGOUsers/user/0/0/unverified";
      return axios.get(backendUrl + link, {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data
          ?.filter((obj) => obj.userStatus === "active")
          ?.map((obj, ind) => {
            let user = {
              value: obj._id.toString(),
              label: obj?.firstName + " " + obj?.lastName,
              email: obj?.email,
              image: obj?.profileImage,
            };
            return user;
          });

        setUserData(data);
      },
    }
  );

  const handleVerifyID = async () => {
    setGoToWhite(true);
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          whoami: user,
          email: userData.filter((obj) => obj.value == user)[0]?.email,
        },
      });
      console.log(`User Successfully Enrolled! Details:
      Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
      setGoToWhite(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const SelectItem = ({ image, label, email, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image}>{label.split(" ")[1][0]}</Avatar>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {email}
          </Text>
        </div>
      </Group>
    </div>
  );
  if (goToWhite) {
    return <Container h={"100vh"}></Container>;
  }
  return (
    <Container>
      <Container
        size="xl"
        w={matches ? "500px" : "auto"}
        p="0px"
        className={classes.userInput}
        mt={50}
      >
        {status === "loading" ? (
          <Loader minHeight="40px" />
        ) : (
          <SelectMenu
            searchable={true}
            itemComponent={SelectItem}
            placeholder="Enter User name or Id"
            clearable={true}
            setData={setUser}
            label="Search User"
            data={userData}
            value={user || id}
            disabled={editId ? true : false}
          />
        )}
      </Container>
      <Container size="xl" w={"100%"} className={classes.faceid}>
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
            label={"Verify FaceID"}
            onClick={handleOpenCamera}
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
          />
        )}
      </Container>
    </Container>
  );
};
