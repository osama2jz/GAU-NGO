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

export const AddBranch = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  let { state } = useLocation();
  const { editData } = state ?? "";
  const isUpdate = editData ? true : false;

  //create a new data with time 00:00:00 and add the editData.branchStartTime to it

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      branchName: "",
      branchLocation: "",
      branchDescription: "",
      branchPicture: null,
      branchContact: "",
      branchEmail: "",
      branchPointOfContact: "",
      branchStartTime: "",
      branchEndTime: "",
    },

    validate: {
      branchName: (value) =>
        /^\w.{2,40}$/.test(value)
          ? null
          : translate("Please enter valid branch name."),
      branchLocation: (value) =>
        value?.length < 2
          ? translate("Please enter last branch address")
          : null,
      branchDescription: (value) =>
        value?.length < 4 ? translate("Please enter branch Description") : null,

      branchContact: (value) =>
        /^(\+34\s?)?(\d{2}|\(\d{2}\))[\s\-]?\d{4}[\s\-]?\d{3}$/.test(value)
          ? null
          : translate("Invalid Phone Number e.g +34 234 5673 890"),
      branchEmail: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate("Please Enter a valid email"),
      branchPointOfContact: (value) =>
        /^\w.{3,16}$/.test(value)
          ? null
          : translate("Please enter Point of Contact"),
      branchStartTime: (value) =>
        value?.length < 1 || moment(value).hours() > 20
          ? translate("Please Select start time before 20:00.")
          : null,
      branchEndTime: (value, values) =>
        value?.length < 1 ||
        moment(value).diff(
          moment(values?.branchStartTime),
          translate("minutes")
        ) < 240
          ? translate("End Time must be 4 hours ahead of Start time")
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
      if (values.branchPicture === null) {
        setUploadError("Please upload the Branch Photo");
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
      <ContainerHeader label={isUpdate ? "Edit Branch" : "Add Branch"} />

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
                {/* {imageUploading ? (
                  <Loader minHeight="5vh" />
                ) : ( */}
                <Text align="center" className={classes.upload}>
                  <Upload size={16} />
                  {translate("Upload")}
                </Text>
                {/* )} */}
              </Dropzone>
            </Input.Wrapper>
          )}
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
          <Grid>
            <Grid.Col sm={6}>
              <Timepicker
                label="Start Time"
                required={true}
                placeholder="Start Time"
                form={form}
                validateName="branchStartTime"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <Timepicker
                label="End Time"
                required={true}
                placeholder="End Time"
                form={form}
                validateName="branchEndTime"
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
            <Button label="Cancel" onClick={() => navigate(-1)} />

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
