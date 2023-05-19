import {
  Anchor,
  Checkbox,
  Divider,
  FileInput,
  Grid,
  Input,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Button from "../../Components/Button";
import ContainerHeader from "../../Components/ContainerHeader";
import InputMask from "react-input-mask";
import InputField from "../../Components/InputField";
import PassInput from "../../Components/PassInput";
import SelectMenu from "../../Components/SelectMenu";
import { backendUrl, s3Config } from "../../constants/constants";
import routeNames from "../../Routes/routeNames";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FileUpload, Loader, Upload } from "tabler-icons-react";
import { UserContext } from "../../contexts/UserContext";

const Signup = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [ngos, setNgos] = useState([]);
  const [fileError, setFileError] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const { translate } = useContext(UserContext);

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
      ngoId: "",
      profileImage: "",
      IDDetails: null,
    },

    validate: {
      userType: (value) =>
        value?.length < 1 ? translate("Please select Professional type") : null,
      ngoId: (value) =>
        value?.length < 1 ? translate("Please select NGO") : null,
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
            <li>{translate("At least one special character.")}</li>
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

  //API call for fetching all ngos
  const { data, status } = useQuery(
    "fetchngos",
    () => {
      return axios.get(`${backendUrl + `/api/ngo/listAll`}`);
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let ngo = {
            value: obj._id,
            label: obj?.ngoName,
          };
          return ngo;
        });
        setNgos(data);
      },
    }
  );

  const handleEmailVerification = useMutation(
    () => {
      return axios.post(
        `${backendUrl + "/api/user/sendUserPasswordResetEmail"}`,
        { email: form.values.email }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          navigate(routeNames.general.otp, {
            state: { allowed: true, type: "email" },
          });
          showNotification({
            title: translate("Verify Email"),
            message: translate(response.data.message),
            color: "green.0",
          });
        } else {
          showNotification({
            title: translate("Invalid Email"),
            message: translate(response.data.message),
            color: "red.0",
          });
        }
      },
    }
  );

  const handleFileInput = (file) => {
    //s3 configs
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
    setFileError(false);
    setFileUploading(true);
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
            form.setFieldValue("IDDetails", link);
            setFileUploading(false);
          }
        });
      }
    });
  };

  const handleSignup = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/user/signup"}`, values);
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          handleEmailVerification.mutate();
        } else {
          showNotification({
            title: translate("Error"),
            message: translate(response.data.message),
            color: "red.0",
          });
        }
      },
    }
  );
  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((values) => handleSignup.mutate(values))}
    >
      <ContainerHeader label={"Sign Up"} />
      <Grid>
        <Grid.Col sm={12}>
          <SelectMenu
            data={ngos}
            placeholder={translate("Select NGO")}
            label={translate("Select NGO")}
            form={form}
            validateName="ngoId"
          />
        </Grid.Col>
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
          />
        </Grid.Col>
        <Grid.Col sm={6}>
          <InputField
            label="Phone Number"
            required={true}
            placeholder="+34 91 1234 567"
            component={InputMask}
            mask="+34 99 9999 999"
            form={form}
            validateName="phoneNumber"
          />
        </Grid.Col>
      </Grid>
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
        <Grid.Col sm={"12"}>
          {form.values.userType.length > 0 &&
            form.values.userType !== "user" && (
              <Input.Wrapper error={fileError} size="md">
                <FileInput
                  required
                  label="Upload ID Document"
                  placeholder={
                    form.values?.IDDetails !== ""
                      ? "Uploaded"
                      : "Upload Document"
                  }
                  accept="file/pdf"
                  mb={"sm"}
                  icon={<FileUpload size={20} color="green" />}
                  onChange={(e) => handleFileInput(e)}
                />
              </Input.Wrapper>
            )}
        </Grid.Col>
      </Grid>
      <Button
        label={"Sign Up"}
        bg={true}
        type="submit"
        w={"100%"}
        size="lg"
        loading={handleSignup.status === "loading" || fileUploading}
      />
      <Text align="center" mt={"sm"}>
        {translate("Already have an Account")}?{" "}
        <Anchor onClick={() => navigate(routeNames.general.login)}>
          {translate("Login Here")}
        </Anchor>
      </Text>
    </form>
  );
};
export default Signup;
