import { Avatar, Container, Divider, Flex, Group, Text } from "@mantine/core";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import userImage from "../../../../assets/teacher.png";
import Button from "../../../../Components/Button";
import Loader from "../../../../Components/Loader";
import ViewModal from "../../../../Components/ViewModal/viewUser";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import { UserInfo } from "../userInformation";

const Step1 = ({
  setSelectedUser,
  setSelectedCase,
  newCase,
  setNewCase,
  img,
  setImg,
  faceID,
  setFaceId,
}) => {
  const { classes } = useStyles();
  const { user: usertoken } = useContext(UserContext);
  const [user, setUser] = useState();
  const [cases, setCases] = useState([]);
  const [userData, setUserData] = useState([]);
  const { id, appId } = useParams();
  const [showCamera, setShowCamera] = useState(false);
  const [goToWhite, setGoToWhite] = useState(false);

  const [disabledIdBtn, setDisabledIdBtn] = useState(false);
  const [disabledCameraBtn, setDisabledCameraBtn] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImg(imageSrc);
  }, [webcamRef]);

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

  //all users
  const { data: users, status } = useQuery(
    "fetchVerified",
    () => {
      return axios.get(backendUrl + "/api/ngo/listNGOVerifiedUsers", {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          let user = {
            value: obj._id.toString(),
            label: obj?.firstName + " " + obj?.lastName,
            email: obj?.email || "",
          };
          return user;
        });
        setUserData(data);
      },
    }
  );

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
      onSuccess: (response) => {
        // setCases([]),
        setSelectedUser(response);
      },
      enabled: !!user,
    }
  );

  //user cases
  const { data: casesData, status: casesfetching } = useQuery(
    ["casesFetched", user],
    () => {
      return axios.get(backendUrl + `/api/case/listUserCases/${user}`, {
        headers: {
          "x-access-token": usertoken?.token,
        },
      });
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
      enabled: !!user,
    }
  );

  const SelectItem = ({ image, label, email, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image || userImage} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.66}>
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
        }).finally(() => {
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
        Verify User
      </Text>

      <Group>
        <Button
          label={"Verify Face ID"}
          bg={true}
          leftIcon="faceid"
          iconWidth="24px"
          styles={{
            width: "220px",
            fontSize: "22px",
            height: "46px",
            margin: "auto",
          }}
          onClick={handleVerifyID}
          disabled={disabledIdBtn}

        />

        <Divider
          label="OR"
          labelPosition="center"
          orientation="vertical"
          color={"rgb(0,0,0,0.5)"}
          // my="md"
        />
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
              width: "220px",
              fontSize: "22px",
              height: "46px",
              margin: "auto",
            }}
            bg={true}
            disabled={disabledCameraBtn}
          />
        )}
      </Group>
      {userFetching === "loading" ? (
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
