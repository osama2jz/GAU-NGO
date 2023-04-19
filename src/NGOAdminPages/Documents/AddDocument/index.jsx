import { Container, FileInput, Group, Input, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
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
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { FileUpload } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import Datepicker from "../../../Components/Datepicker";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import TextEditor from "../../../Components/TextEditor";
import { backendUrl, s3Config } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const AddDocument = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user,translate } = useContext(UserContext);
  const [documents, setDocuments] = useState([]);
  const [filerror, setFileError] = useState("");
  const [fileUploading, setFileUploading] = useState(false);

  let { state } = useLocation();

  const { editdata } = state ?? "";

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      documentTitle: "",
      documentURL: null,
      expiryDate: "",
    },

    validate: {
      documentTitle: (value) =>
        value?.length < 1 ? translate("Please enter document title") : null,
    },
  });

  useEffect(() => {
    if (editdata) {
      form.setValues(editdata);
    }
  }, [editdata]);

  const handleAddDocument = useMutation(
    (values) => {
      if (!form.values.documentURL) {
        setFileError("Please upload the file");
        return;
      }
      return axios.post(
        `${backendUrl + "/api/lookup/createAdminDocuments"}`,
        { documents: [values] },
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
            title: "Document Created",
            message: "New Document Created Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewDocuments);
        } else {
          showNotification({
            title: "Failed",
            message: response.data.message,
            color: "red.0",
          });
        }
      },
    }
  );

  const handleEditDocument = useMutation(
    (values) => {
      values.documentText = editorr.getHTML();
      return axios.post(
        `${backendUrl + "/api/lookup/updateDocument"}`,
        values,
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
            title: "Document Created",
            message: "Document Updated Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewDocuments);
        } else {
          showNotification({
            title: "Failed",
            message: "Failed to Update Document!",
            color: "red.0",
          });
        }
      },
    }
  );

  const handleFileInput = (file, type) => {
    // setFileLoader(true);
    //s3 configs
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
    setFileError("");
    setFileUploading(true);
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
            form.setFieldValue("documentURL", link);
            setFileUploading(false);
          }
        });
      }
    });
  };

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={editdata ? "Edit Document" : "Add Document"} />
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) =>
          editdata
            ? handleEditDocument.mutate(values)
            : handleAddDocument.mutate(values)
        )}
      >
        <InputField
          label={"Document Title"}
          placeholder="Enter Document Title"
          required
          form={form}
          validateName="documentTitle"
        />
        <SimpleGrid cols={2}>
          <Datepicker
            label={"Expiry Date"}
            form={form}
            validateName="expiryDate"
          />
          <Input.Wrapper error={filerror} size={"md"}>
            <FileInput
              label={translate("Upload Document")}
              placeholder={translate("Upload Document")}
              required={true}
              size="md"
              accept="file/pdf"
              styles={(theme) => ({
                root: {
                  margin: "auto",
                },
                input: {
                  border: "1px solid rgb(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                },
              })}
              icon={<FileUpload size={20} />}
              onChange={(e) => handleFileInput(e, "file")}
            />
          </Input.Wrapper>
        </SimpleGrid>
        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.ngoAdmin.viewDocuments)}
          />
          <Button
            label={editdata ? "Update Document" : "Add Document"}
            leftIcon={"plus"}
            primary={true}
            type="submit"
            loading={handleAddDocument.isLoading || fileUploading}
          />
        </Group>
      </form>
    </Container>
  );
};
