import {
  ActionIcon,
  Anchor,
  Avatar,
  Container,
  FileInput,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { CircleX, FileUpload, Trash, Upload } from "tabler-icons-react";
import Button from "../../Components/Button";
import DeleteModal from "../../Components/DeleteModal";
import InputField from "../../Components/InputField";
import { backendUrl, s3Config } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import { useStyles } from "./styles";

const MyDocs = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, translate } = useContext(UserContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [fileLoader, setFileLoader] = useState(false);
  const [oldDocs, setOldDocs] = useState([]);
  const [docs, setDocs] = useState([
    {
      documentTitle: "",
      documentURL: null,
    },
  ]);

  const handleDeleteDocument = useMutation(
    (deleteId) => {
      return axios.get(
        `${backendUrl + `/api/lookup/deleteGeneralDocument/${deleteID}`}`,
        {},
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: translate("Document Created"),
            message: translate("Document Deleted Successfully"),
            color: "green.0",
          });
          setOpenDeleteModal(false);
          queryClient.invalidateQueries("fetchUserSingle");
        } else {
          showNotification({
            title: translate("Failed"),
            message: translate("Failed to Delete"),
            color: "red.0",
          });
        }
      },
    }
  );
  useEffect(() => {
    setOldDocs(user.documents);
  }, [user, user.documents, handleDeleteDocument.isSuccess]);

  const handleAddDocument = useMutation(
    () => {
      if (!docs[docs.length - 1].documentURL) {
        setFileError("Please upload the file");
        return;
      }
      return axios.post(
        `${backendUrl + "/api/lookup/createAdminDocuments"}`,
        { documents: docs },
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: translate("Document Created"),
            message: translate("New Document Created Successfully!"),
            color: "green.0",
          });
          setOldDocs((v) => [...v, ...docs]);
          setDocs([
            {
              documentTitle: "",
              documentURL: null,
            },
          ]);
        } else {
          showNotification({
            title: translate("Failed"),
            message: translate(response.data.message),
            color: "red.0",
          });
        }
      },
    }
  );
  const handleFileInput = (file, index) => {
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
    setFileLoader(true);
    //s3 configs
    AWS.config.region = s3Config.region;
    // console.log(aws);
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: s3Config.IdentityPoolId,
    });

    AWS.config.credentials.get(function (err) {
      if (err) alert(err);
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
              title: translate("Upload Failed"),
              message: translate("Something went Wrong"),
              color: "red.0",
            });
          } else {
            let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
            docs[index].documentURL = link;
            setDocs([...docs]);
            setFileLoader(false);
          }
        });
      }
    });
  };
  const addInputField = () => {
    const obj = {
      documentTitle: "",
      documentURL: "",
    };
    setDocs([...docs, obj]);
  };

  return (
    <Container
      className={classes.container}
      // p={30}
      shadow="sm"
      mt="sm"
      size={"xl"}
    >
      <Text align="center" mb="md" color={"gray"}>
        {translate(
          "Add your frequently used documents here. These documents are public and can be viewed by all the professional users."
        )}
      </Text>
      <ol>
        {oldDocs.map((obj) => {
          return (
            <li>
              <Flex justify={"space-between"} maw="300px" pl="lg">
                <Anchor href={obj.documentURL} target="_blank">
                  {obj.documentTitle}
                </Anchor>
                <ActionIcon>
                  <Trash
                    color="red"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setDeleteID(obj._id);
                    }}
                  />
                </ActionIcon>
              </Flex>
            </li>
          );
        })}
      </ol>
      <Grid>
        {docs?.map((i, index) => (
          <>
            <Grid.Col md="8" sm="6">
              <InputField
                label={"Document Name"}
                placeholder="Enter document name"
                required
                maxLength={30}
                value={docs[index]?.documentTitle}
                onChange={(e) => {
                  docs[index].documentTitle = e.target.value;
                  setDocs([...docs]);
                }}
              />
            </Grid.Col>
            <Grid.Col md="3" sm="6">
              <FileInput
                placeholder={"Select File"}
                size="md"
                key={index}
                label="Select File"
                required
                ml={"0px"}
                accept="file/pdf"
                disabled={docs[index].documentTitle === ""}
                styles={(theme) => ({
                  root: {
                    marginRight: "auto",
                  },
                  input: {
                    border: "1px solid rgb(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  },
                  placeholder: {
                    color: "black !important",
                  },
                })}
                icon={<FileUpload size={20} color="green" />}
                onChange={(e) => handleFileInput(e, index)}
              />
            </Grid.Col>
            {index === docs.length - 1 && (
              <Grid.Col
                md="1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  label={"Add"}
                  leftIcon="plus"
                  onClick={() => addInputField()}
                  loading={fileLoader}
                  disabled={
                    docs[docs.length - 1].documentTitle === "" ||
                    !docs[docs.length - 1].documentURL
                  }
                  bg={true}
                />
              </Grid.Col>
            )}
          </>
        ))}
      </Grid>
      <Group position="right" mt="sm">
        <Button
          label="Cancel"
          onClick={() => navigate(routeNames.socialWorker.dashboard)}
        />
        <Button
          label="Save Changes"
          primary={true}
          onClick={handleAddDocument.mutate}
          disabled={!docs[docs.length - 1].documentURL}
          loading={handleAddDocument.isLoading || fileLoader}
        />
      </Group>
      <DeleteModal
        opened={openDeleteModal}
        setOpened={setOpenDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        loading={handleDeleteDocument.isLoading}
        onDelete={handleDeleteDocument.mutate}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
    </Container>
  );
};
export default MyDocs;
