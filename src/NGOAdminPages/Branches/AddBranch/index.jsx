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
import ngoDefault from "../../../assets/ngoDefault.png";
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

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  // const [fileUploading, setFileUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imageData, setImageData] = useState(null);

  let { state } = useLocation();
  const { editData } = state ?? "";
  const isUpdate = editData ? true : false;

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
    if (isUpdate) {
      setImageData(editData?.branchPicture);
      form.setFieldValue("branchName", editData?.name);
      form.setFieldValue("branchDescription", editData?.description);
      form.setFieldValue("branchLocation", editData?.location);
      form.setFieldValue("branchPicture", editData?.image);
      form.setFieldValue(
        "branchPointOfContact",
        editData?.branchPointOfContact
      );
      form.setFieldValue("branchEmail", editData?.branchEmail);
      form.setFieldValue("branchContact", editData?.branchContact);
    }
    else{
      form.reset()
    }
  }, [isUpdate, editData]);

  const handleAddBranch = useMutation(
    (values) => {
      if (imageData === null) {
        setUploadError("Please upload the Branch Photo");
      } else {
        if (isUpdate) {
          values = { ...values, branchId: editData?.id };
        }
        const link = editData?.id
          ? "/api/ngo/editBranch"
          : "/api/ngo/createBranch";
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
            title: isUpdate ? "Branch Detail Updated" : "Branch Added",
            message: isUpdate
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
      <ContainerHeader label={isUpdate ? "Edit Branch" : "Add Branch"} />

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
                src={isUpdate ? editData?.image : ngoDefault}
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
            <Button
              label="Cancel"
              onClick={() => navigate(routeNames.ngoAdmin.viewBranches)}
            />

            <Button
              label={isUpdate ? "Update" : "Add Branch"}
              leftIcon={isUpdate ? "" : "plus"}
              primary={true}
              type="submit"
              loading={handleAddBranch.isLoading || imageUploading}
            />
          </Group>
        </Container>
      </form>
    </Container>
  );
};
