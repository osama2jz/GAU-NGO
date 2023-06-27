import {
  Anchor,
  Avatar,
  Container,
  Grid,
  Group,
  Input,
  Text,
} from "@mantine/core";
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
import Timepicker from "../../../Components/Timepicker";

import { useStyles } from "./styles";
import InputMask from "react-input-mask";
import moment from "moment";
import PassInput from "../../../Components/PassInput";
const index = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  let { state } = useLocation();
  const { editData } = state ?? "";
  console.log("editDta", editData);
  const isUpdate = editData ? true : false;

  //create a new data with time 00:00:00 and add the editData.branchStartTime to it

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ngoName: "",
      ngoLocation: "",
      ngoDescription: "",
      ngoPicture: null,
      ngoContact: "",
      ngoEmail: "",
      ngoPointOfContact: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      ngoName: (value) =>
        /^\w.{2,40}$/.test(value) ? null : translate("Please enter Ngo name"),
      ngoLocation: (value) =>
        value?.length < 2 ? translate("Please enter Ngo address") : null,
      ngoDescription: (value) =>
        value?.length < 4 ? translate("Please enter Ngo Description") : null,

      ngoContact: (value) =>
        /^(\+34\s?)?(\d{2}|\(\d{2}\))[\s\-]?\d{4}[\s\-]?\d{3}$/.test(value)
          ? null
          : translate("Please enter Phone Number"),
      ngoEmail: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate("Please Enter a valid email"),
      ngoPointOfContact: (value) =>
        /^\w.{3,16}$/.test(value)
          ? null
          : translate("Please enter Point of Contact"),
      password: (value) =>
        editData ||
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          value
        ) ? null : (
          <ul>
            {translate("Password must contain 8 to 15 characters with")}
            <li>{translate("At least one captial alphabet.")}</li>
            <li>{translate("At least one small alphabet.")}</li>
            <li>
              {translate("At least one digit and one special character.")}
            </li>
            <li>{translate("at least one special character.")}</li>
          </ul>
        ),
      confirmPassword: (value, values) =>
        value !== values?.password
          ? translate("Passwords did not match")
          : null,
    },
  });

  useEffect(() => {
    if (isUpdate) {
      let startTime = new Date();
      let endTime = new Date();
      startTime.setHours(0, 0, 0, 0);
      startTime.setHours(editData?.branchStartTime?.split(":")[0]);

      endTime.setHours(0, 0, 0, 0);
      endTime.setHours(editData?.branchEndTime?.split(":")[0]);

      form.setFieldValue("branchStartTime", startTime);
      form.setFieldValue("branchEndTime", endTime);
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
      // form.setFieldValue("branchEndTime", moment(editData?.branchEndTime).format("HH:mm"));
    } else {
      form.reset();
    }
  }, [isUpdate, editData]);

  const handleAddBranch = useMutation(
    (values) => {
      if (values?.ngoPicture === null) {
        setUploadError(translate("Please upload the Ngo Photo"));
      } else {
        if (isUpdate) {
          values = { ...values, branchId: editData?.id };
        }

        let obj = {
          branchName: values?.branchName,
          branchLocation: values?.branchLocation,
          branchDescription: values?.branchDescription,
          branchPicture: values?.branchPicture,
          branchContact: values?.branchContact,
          branchEmail: values?.branchEmail,
          branchPointOfContact: values?.branchPointOfContact,
          branchStartTime: moment(values?.branchStartTime).format("HH:mm"),
          branchEndTime: moment(values?.branchEndTime).format("HH:mm"),
        };
        if (isUpdate) {
          obj = { ...obj, branchId: editData?.id };
        }
        const link = editData?.id
          ? "/api/ngo/editBranch"
          : "/api/ngo/createBranch";
        return axios.post(`${backendUrl + link}`, obj, {
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
            title: isUpdate
              ? translate("Branch Detail Updated")
              : translate("Branch Added"),
            message: isUpdate
              ? translate("Branch Information Updated SuccessFully!")
              : translate("New Branch added Successfully!"),
            color: "green.0",
          });
          form.reset();
          navigate(routeNames.ngoAdmin.viewBranches);
        } else {
          showNotification({
            title: translate("Failed"),
            message: translate(response?.data?.message),
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
              title: translate("Upload Failed"),
              message: translate("Something went Wrong"),
              color: "red.0",
            });
          } else {
            let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
            form.setFieldValue("branchPicture", link);
            setImageUploading(false);
          }
        });
      }
    });
  };
  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={isUpdate ? "Edit NGO" : "Add NGO"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddBranch.mutate(values))}
      >
        <Group className={classes.dp}>
          <Container pos={"relative"}>
            {imageUploading ? (
              <Loader minHeight="200px" />
            ) : (
              <Avatar
                size={200}
                radius="xl"
                m={"0px"}
                p={"0px"}
                src={form.values.branchPicture || ngoDefault}
              />
            )}
          </Container>
          {form.values.branchPicture ? (
            <Anchor onClick={() => form.setFieldValue("branchPicture", null)}>
              {translate("Remove")}
            </Anchor>
          ) : (
            <Input.Wrapper error={uploadError} size={"md"}>
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                style={{ width: "150px" }}
                onDrop={(v) => {
                  handleImageInput(v[0]);
                }}
              >
                <Text align="center" className={classes.upload}>
                  <Upload size={16} />
                  {translate("Upload")}
                </Text>
              </Dropzone>
            </Input.Wrapper>
          )}
        </Group>
        <Container p={"0px"} size="xs" m={"sm"}>
          <Grid>
            <Grid.Col sm={form.values.userType === "user" ? 12 : 6}>
              <InputField
                label="NGO Name"
                required={true}
                placeholder="NGO Name"
                form={form}
                validateName="ngoName"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <InputField
                label="Ngo Email"
                required={true}
                placeholder="Ngo Email"
                form={form}
                validateName="ngoEmail"
              />
            </Grid.Col>

            <Grid.Col sm={6}>
              <InputField
                label="Point Of Contact"
                required={true}
                placeholder="Point Of Contact"
                form={form}
                validateName="ngoPointOfContact"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <InputField
                label="Ngo Contact"
                required={true}
                placeholder="+34 -- ---- ---"
                component={InputMask}
                mask="+34 99 9999 999"
                form={form}
                validateName="ngoContact"
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col sm={12}>
              <InputField
                label="Ngo Address"
                required={true}
                placeholder="Ngo Address"
                form={form}
                validateName="ngoLocation"
              />
            </Grid.Col>
          </Grid>

          {!editData && (
            <Grid>
              <Grid.Col sm={6}>
                <PassInput
                  label="Password"
                  required={true}
                  placeholder="*******"
                  form={form}
                  validateName="password"
                />
              </Grid.Col>

              <Grid.Col sm={6}>
                <PassInput
                  label="Confirm Password"
                  required={true}
                  placeholder="*******"
                  form={form}
                  validateName="confirmPassword"
                />
              </Grid.Col>
            </Grid>
          )}

          <TextArea
            placeholder={"Ngo Details"}
            label="Description"
            rows="2"
            form={form}
            required={true}
            validateName="ngoDescription"
          />
          <Group position="right" mt="sm">
            <Button label="Cancel" onClick={() => navigate(-1)} />

            <Button
              label={isUpdate ? "Update" : "Add Ngo"}
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

export default index;
