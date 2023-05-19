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
import ReactInputMask from "react-input-mask";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleX, Upload } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import PassInput from "../../../Components/PassInput";
import { backendUrl, s3Config } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import SubmitModal from "./SubmitEmail";

export const AddUser = () => {
  const { classes } = useStyles();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [error, setError] = useState();

  const { state } = useLocation();
  const { editData } = state ?? "";

  useEffect(() => {
    if (editData) {
      form.setFieldValue(
        "firstName",
        editData?.name.substring(0, editData?.name.indexOf(" "))
      );
      form.setFieldValue(
        "lastName",
        editData?.name.substring(editData?.name.indexOf(" "))
      );
      form.setFieldValue("email", editData?.email);
      form.setFieldValue("phoneNumber", editData?.phone);
      form.setFieldValue("userType", editData?.userType);
      form.setFieldValue("profileImage", editData?.image);
    }
  }, [editData]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      userType: "user",
      profileImage: null,
    },

    validate: {
      firstName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : translate("Please enter first name between 2 to 15 characters."),
      lastName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : translate("Please enter last name between 2 to 15 characters"),

      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate("Please Enter a valid email"),

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
      phoneNumber: (value) =>
        /^(\+34\s?)?(\d{2}|\(\d{2}\))[\s\-]?\d{4}[\s\-]?\d{3}$/.test(value)
          ? null
          : translate("Please enter valid phone number"),
      confirmPassword: (value, values) =>
        value !== values?.password
          ? translate("Passwords did not match")
          : null,
    },
  });

  const handleAddUser = useMutation(
    (values) => {
      if (editData?.id) {
        values = { ...values, userId: editData?.id };
      }
      let link = editData ? "/api/user/edit" : "/api/user/create";
      return axios.post(`${backendUrl + link}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: editData ? translate("Information Updated") : translate("User Added"),
            message: editData
              ? translate("User Information Updated Successfully!")
              : translate("New User added Successfully!"),
            color: "green.0",
          });
          navigate(routeNames.socialWorker.allUsers);
          form.reset();
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
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
    // setFileLoader(true);
    //s3 configs
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
              title: translate("Upload Failed"),
              message: translate("Something went Wrong"),
              color: "red.0",
            });
          } else {
            let link = "https://testing-buck-22.s3.amazonaws.com/" + objKey;
            form.setFieldValue("profileImage", link);
          }
          setFileUploading(false);
        });
      }
    });
  };
  return (
    <Container className={classes.addUser} size="xl" p={"0px"}>
      <ContainerHeader label={editData ? "Edit User" : "Add User"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddUser.mutate(values))}
      >
        <Group className={classes.dp}>
          <Container pos={"relative"}>
            {fileUploading ? (
              <Loader minHeight="200px" />
            ) : (
              <Avatar
                size={200}
                radius="xl"
                m={"0px"}
                p={"0px"}
                src={
                  form.values.profileImage ||
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
              />
            )}
          </Container>
          {form.values.profileImage ? (
            <Anchor onClick={() => form.setFieldValue("profileImage", null)}>
              {translate("Remove")}
            </Anchor>
          ) : (
            <Input.Wrapper error={error} size={"md"}>
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                style={{ width: "150px" }}
                onDrop={(v) => {
                  setFiles(v);
                  handleImageInput(v[0]);
                }}
              >
                <Text align="center" className={classes.upload}>
                  <Upload size={16} color="green" />
                  {translate("Upload")}
                </Text>
              </Dropzone>
            </Input.Wrapper>
          )}
        </Group>
        <Container p={"0px"} size="xl" m={"sm"}>
          <Grid>
            <Grid.Col sm={6}>
              <InputField
                label="First Name"
                required={true}
                placeholder="First Name"
                form={form}
                validateName="firstName"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <InputField
                label="Last Name"
                required={true}
                placeholder="Last Name"
                form={form}
                validateName="lastName"
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col sm={6}>
              <InputField
                label="Email"
                required={true}
                placeholder="xyz@gmail.com"
                form={form}
                validateName="email"
                disabled={editData ? true : false}
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <InputField
                label="Phone Number"
                required={true}
                placeholder="+34 91 1234 567"
                component={ReactInputMask}
                mask="+34 99 9999 999"
                form={form}
                validateName="phoneNumber"
              />
            </Grid.Col>
          </Grid>
          {!editData && (
            <>
              <PassInput
                label="Password"
                required={true}
                placeholder="*******"
                form={form}
                validateName="password"
              />
              <PassInput
                label="Confirm Password"
                required={true}
                placeholder="*******"
                form={form}
                validateName="confirmPassword"
              />
              {/* <Text pb={"sm"} size="sm">
            By pressing “Submit” I declare that i’ve read and agree to the{" "}
            <b>GAU</b> <Anchor color={"green"}>Terms and Conditions.</Anchor>
          </Text> */}
            </>
          )}

          <Group position="right" mt="sm">
            <Button
              label="Cancel"
              onClick={() => navigate(routeNames.socialWorker.allUsers)}
            />
            <Button
              label={editData ? "Update" : "Add User"}
              leftIcon={editData ? "" : "plus"}
              primary={true}
              type="submit"
              loading={handleAddUser.isLoading || fileUploading}
            />
          </Group>
        </Container>
      </form>
      <SubmitModal opened={showModal} setOpened={setShowModal} />
    </Container>
  );
};
