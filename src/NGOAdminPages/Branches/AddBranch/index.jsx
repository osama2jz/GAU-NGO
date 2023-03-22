import { Avatar, Container, Grid, Group, Input, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Upload } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import TextArea from "../../../Components/TextArea";
import { backendUrl, s3Config } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import InputMask from "react-input-mask";

export const AddBranch = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imageData, setImageData] = useState("");

  console.log("image", imageData);

  let { state } = useLocation();
  const { editData } = state ?? "";

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      branchName: "",
      branchLocation: "",
      branchDescription: "",
      branchPicture: "",
      branchContact: "",
      branchEmail: "",
      branchPointOfContact: "",
    },

    validate: {
      branchName: (value) =>
        /^\w.{5,40}$/.test(value) ? null : "Please enter valid branch name.",
      branchLocation: (value) =>
        value?.length < 2 ? "Please enter last branch address" : null,
      branchDescription: (value) =>
        value?.length < 4 ? "Please enter branch Description" : null,

      branchContact: (value) =>
        /^(\+34\s?)?(\d{2}|\(\d{2}\))[\s\-]?\d{4}[\s\-]?\d{3}$/.test(value)
          ? null
          : "Invalid Phone Number e.g +34 234 5673 890",
      branchEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please Enter a valid email",
      branchPointOfContact: (value) =>
        value?.length < 3 ? "Please enter Point of Contact" : null,
    },
  });

  useEffect(() => {
    if (editData) {
      setImageData(editData?.branchPicture);
      form.setFieldValue("branchName", editData?.name);
      form.setFieldValue("branchDescription", editData?.description);
      form.setFieldValue("branchLocation", editData?.location);
      form.setFieldValue("branchPicture", editData?.branchPicture);
      form.setFieldValue(
        "branchPointOfContact",
        editData?.branchPointOfContact
      );
      form.setFieldValue("branchEmail", editData?.branchEmail);
      form.setFieldValue("branchContact", editData?.branchContact);
    }
  }, [editData]);
  const handleAddBranch = useMutation(
    (values) => {
      if (imageData === "") {
        console.log("hello");
        setUploadError("Please upload the Branch Photo");
      } else {
        if (id) {
          values = { ...values, branchId: id };
        }
        const link = id ? "/api/ngo/editBranch" : "/api/ngo/createBranch";
        return axios.post(`${backendUrl + link}`, values, {
          headers: {
            "x-access-token": user.token,
          },
        });
      }
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: id ? "Branch Detail Updated" : "Branch Added",
            message: id
              ? "Branch Information Updated SuccessFully!"
              : "New Branch added Successfully!",
            color: "green.0",
          });
          form.reset();
          navigate(routeNames.ngoAdmin.viewBranches);
        } else {
          showNotification({
            title: "Failed",
            message: response?.data?.message,
            color: "red.0",
          });
        }
      },
    }
  );

  const handleImageInput = (file, type) => {
    // setFileLoader(true);
    //s3 configs
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
    setUploadError("");
    setImageUploading(true);
    const aws = new AWS.S3();
    AWS.config.region = s3Config.region;
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
              title: "Upload Failed",
              message: "Something went Wrong",
              color: "red.0",
            });
          } else {
            let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
            setImageData(link);

            form.setFieldValue("branchPicture", link);
            setImageUploading(false);
          }
        });
      }
    });
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Avatar
        size={200}
        key={index}
        src={imageUrl}
        radius="xl"
        m={"0px"}
        p="0px"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={id ? "Edit Branch" : "Add Branch"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddBranch.mutate(values))}
      >
        <Group className={classes.dp}>
          <Container pos={"relative"}>
            {files.length > 0 ? (
              previews
            ) : (
              <Avatar
                size={200}
                radius="xl"
                m={"0px"}
                p={"0px"}
                src={
                  id
                    ? editData?.branchPicture
                    : "data:image/png;base64,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"
                }
              />
            )}
          </Container>
          <Input.Wrapper error={uploadError} size={"md"}>
            <Dropzone
              accept={IMAGE_MIME_TYPE}
              maxFiles={1}
              style={{ width: "150px" }}
              onDrop={(v) => {
                setFiles(v);
                handleImageInput(v[0]);
              }}
            >
              {imageUploading ? (
                <Loader minHeight="5vh" />
              ) : (
                <Text align="center" className={classes.upload}>
                  <Upload size={16} />
                  Upload
                </Text>
              )}
            </Dropzone>
          </Input.Wrapper>
        </Group>
        <Container p={"0px"} size="xs" m={"sm"}>
          <Grid>
            <Grid.Col sm={form.values.userType === "user" ? 12 : 6}>
              <InputField
                label="Branch Name"
                required={true}
                placeholder="Branch Name"
                form={form}
                validateName="branchName"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <InputField
                label="Branch Email"
                required={true}
                placeholder="Branch Email"
                form={form}
                validateName="branchEmail"
              />
            </Grid.Col>

            <Grid.Col sm={6}>
              <InputField
                label="Point Of Contact"
                required={true}
                placeholder=" Point Of Contact"
                form={form}
                validateName="branchPointOfContact"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <InputField
                label="Branch Contact"
                required={true}
                placeholder="+34 21 4564 790"
                component={InputMask}
                mask="+34 99 9999 999"
                form={form}
                validateName="branchContact"
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col sm={12}>
              <InputField
                label="Branch Address"
                required={true}
                placeholder="Branch Address"
                form={form}
                validateName="branchLocation"
              />
            </Grid.Col>
          </Grid>

          <TextArea
            placeholder={"Branch Details"}
            label="Description"
            rows="2"
            form={form}
            required={true}
            validateName="branchDescription"
          />
          <Group position="right" mt="sm">
            {fileUploading ? (
              <Loader minHeight="40px" />
            ) : (
              <>
                <Button
                  label="Cancel"
                  onClick={() => navigate(routeNames.ngoAdmin.viewBranches)}
                />

                <Button
                  label={id ? "Update" : "Add Branch"}
                  leftIcon={id ? "" : "plus"}
                  primary={true}
                  type="submit"
                  loading={handleAddBranch.isLoading || imageUploading}
                />
              </>
            )}
          </Group>
        </Container>
      </form>
    </Container>
  );
};
