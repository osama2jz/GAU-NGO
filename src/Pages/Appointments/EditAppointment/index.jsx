import {
  Anchor,
  Avatar,
  Badge,
  Container, Divider, FileInput, Flex,
  Grid,
  Group,
  SimpleGrid,
  Text
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { ArrowNarrowLeft, FileUpload } from "tabler-icons-react";
import userlogo from "../../../assets/teacher.png";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import { backendUrl, s3Config } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";

function EditAppointments() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [otherDocument, setOtherDocument] = useState([
    {
      documentName: "",
      documentURL: "",
      createdBy: user.id,
    },
  ]);

  const [fileLoader, setFileLoader] = useState(false);
  let { state } = useLocation();

  const { editData } = state ?? "";

  useEffect(() => {
    setOtherDocument(editData?.doc);
  }, [editData?.doc]);

  //Upload Document
  const handleUploadDocuments = useMutation(
    () => {
      const value = {
        caseId: editData?.caseId,
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
        if (response.status === 200) {
          showNotification({
            color: "green.0",
            message: "Appoinment uploaded Successfully",
            title: "Success",
          });
          navigate(-1);
        } else {
          showNotification({
            color: "red.0",
            message: "Something went wrong",
            title: "Error",
          });
        }
      },
    }
  );

  const addInputField = () => {
    if (otherDocument[otherDocument.length - 1].documentName !== "") {
      const obj = {
        documentName: "",
        documentURL: "",
        createdBy: user.id,
      };
      setOtherDocument([...otherDocument, obj]);
    }
  };

  //selected user
  const { data, status } = useQuery(
    ["userFetchedById"],
    () => {
      return axios.get(
        backendUrl + `/api/user/listSingleUser/${editData?.id}`,
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      cacheTime: 0,
      onSuccess: (response) => {},
      enabled: !!editData?.id,
    }
  );

  const handleFileInput = (file, index) => {
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
    setFileLoader(true);
    //s3 configs
    const aws = new AWS.S3();
    AWS.config.region = s3Config.region;
    // console.log(aws);
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: s3Config.IdentityPoolId,
    });

    AWS.config.credentials.get(function (err) {
      if (err) alert(err);
      console.log(AWS.config.credentials);
    });
    var bucket = new AWS.S3({
      params: {
        Bucket: s3Config.bucketName,
      },
    });
    var objKey = sanitizedFileName;
    var params = {
      Key: objKey,
      ContentType: file.type,
      Body: file,
      ACL: "public-read",
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        results.innerHTML = "ERROR: " + err;
      } else {
        bucket.listObjects(function (err, data) {
          if (err) {
            showNotification({
              title: "Upload Failed",
              message: "Something went Wrong",
              color: "red.0",
            });
          } else {
            let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
            otherDocument[index].documentURL = link;
            setOtherDocument([...otherDocument]);
          }
        });
      }
      setFileLoader(false);
    });
  };

  return (
    <Container className={classes.addUser} size="xl" p={"0px"} bg={""}>
      <ContainerHeader label={"Edit Appointment"} />
      <Container p={"xs"} className={classes.innerContainer} size="xl">
        <Container p="sm">
          <Flex justify={"space-between"}>
            <Anchor
              fz={12}
              fw="bolder"
              className={classes.back}
              onClick={() => navigate(-1)}
            >
              <ArrowNarrowLeft />
              <Text>Back</Text>
            </Anchor>
          </Flex>
          <Grid align="center" justify={"space-between"}>
            <Grid.Col md={4}>
              <Avatar
                radius="xl"
                size={150}
                src={editData?.image || userlogo}
                className={classes.avatar}
              />
            </Grid.Col>
            <Grid.Col md={8} style={{ backgroundColor: "white" }}>
              <Text size={24} weight="bold" mb="sm" align="center">
                {editData?.name}
              </Text>
              <Container w={"100%"} ml="md">
                <SimpleGrid cols={2} spacing="xs">
                  <Text className={classes.textheading}>Appointee</Text>
                  <Text className={classes.textContent}>
                    {editData?.addedBy}
                  </Text>
                  <Text className={classes.textheading}>Case #</Text>
                  <Text className={classes.textContent}>
                    {editData?.caseNo}
                  </Text>
                  <Text className={classes.textheading}>Case Name</Text>
                  <Text className={classes.textContent}>
                    {editData?.caseName}
                  </Text>
                  <Text className={classes.textheading}>Appointment Date</Text>
                  <Text className={classes.textContent}>{editData?.date}</Text>
                  <Text className={classes.textheading}>Appointment Time</Text>
                  <Text className={classes.textContent}>{editData?.time}</Text>
                  <Text className={classes.textheading}>Status</Text>
                  <Text className={classes.textContent}>
                    <Badge
                      variant="outline"
                      color={
                        editData?.status === "SCHEDULED" ? "blue.0" : "red.0"
                      }
                    >
                      {editData?.status}
                    </Badge>
                  </Text>
                </SimpleGrid>
              </Container>
            </Grid.Col>
          </Grid>

          <Divider color="#C8C8C8" mt="md" mb="md" />

          <Text
            align="center"
            fw={"bolder"}
            mb={"md"}
            fz={"20px"}
            color="rgb(0,0,0,0.5)"
          >
            Post Appointment Documents
          </Text>
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 4 },
              { maxWidth: "xs", cols: 2 },
            ]}
          >
            {otherDocument?.map((i, index) => (
              <>
                <InputField
                  label={"Document Name"}
                  placeholder="Enter document name"
                  disabled={i?.documentURL}
                  value={i?.documentName}
                  onChange={(e) => {
                    // update value at current index in other document array
                    otherDocument[index].documentName = e.target.value;
                    // update array (pass by value) for re-render
                    setOtherDocument([...otherDocument]);
                  }}
                />

                <FileInput
                  placeholder={i?.documentURL ? "Uploaded" : "Upload"}
                  bg={i?.documentURL ? "green.0" : ""}
                  mb="md"
                  ml={"0px"}
                  accept="file/pdf"
                  styles={(theme) => ({
                    root: {
                      margin: "auto",
                    },
                    input: {
                      border: "1px solid rgb(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                      // width: "250px",
                    },
                  })}
                  icon={<FileUpload size={20} />}
                  onChange={(e) => handleFileInput(e, index)}
                />

                {/* )} */}
              </>
            ))}
          </SimpleGrid>
          <Button
            label={"Add Document"}
            onClick={() => addInputField()}
            bg={true}
          />
        </Container>
        <Group position="right" mt="sm">
          <Button label="Cancel" onClick={() => navigate(-1)} />
          <Button
            label="Update"
            primary={true}
            disabled={fileLoader}
            loading={fileLoader}
            onClick={() => handleUploadDocuments.mutate()}
          />
        </Group>
      </Container>
    </Container>
  );
}

export default EditAppointments;
