import {
  Anchor,
  Avatar,
  Container,
  FileInput,
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
import { FileUpload, InfoCircle, Upload } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import PassInput from "../../../Components/PassInput";
import SelectMenu from "../../../Components/SelectMenu";
import { backendUrl, s3Config } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import InputMask from "react-input-mask";

export const AddProfessional = () => {
  const { classes } = useStyles();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [filerror, setFileError] = useState("");
  const [imageData, setImageData] = useState("");
  const [fileData, setFileData] = useState("");
  const {id}=useParams()
  let {state}=useLocation()
  const {editData}=state ?? ""

  const isUpdate=editData ? true : false

  useEffect(()=>{
    if(editData){
      // const a=editData?.name.substring(0, editData?.name.indexOf(' ')); 
      const b=editData?.phone.substring(1); 
      // console.log(a)
      console.log(b)
      form.setFieldValue("firstName",editData?.name.substring(0, editData?.name.indexOf(' ')) )
      form.setFieldValue("lastName",editData?.name.substring(editData?.name.indexOf(' ')))
      form.setFieldValue("email",editData?.email)
      form.setFieldValue("phoneNumber",editData?.phone)
      form.setFieldValue("userType",editData?.userType)
      form.setFieldValue("IDDetails",editData?.idDetails)
      form.setFieldValue("profileImage",editData?.image)

      setImageData(editData?.image)
      setFileData(editData?.idDetails)

      console.log("file Data",fileData)
      console.log(editData?.image.includes("https://") )

    }

  },[isUpdate,editData])
 

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      userType: "",
      profileImage: "",
      IDDetails: "",
    },

    validate: {
      userType: (value) =>
        value?.length < 1 ? "Please select Professional type" : null,
      firstName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : "Please enter first name between 2 to 15 characters.",
      lastName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : "Please enter last name between 2 to 15 characters",

      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please Enter a valid email",

      password: (value) =>
      isUpdate || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
        value
      )
          ? null
          : "Password must contain 8 to 15 characters with at least one captial, one small, one digit and one special character.",
          phoneNumber: (value) =>
        /^(\+34\s?)?(\d{2}|\(\d{2}\))[\s\-]?\d{4}[\s\-]?\d{3}$/.test(value)
          ? null
          : "Invalid Phone Number e.g +34 234 5673 890",
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
      // profileImage: (value) =>
      //   value.length < 1 ? "Please upload a profile image" : null,
    },
  });

  const handleAddUser = useMutation(
    (values) => {
      console.log("values", values);
      // console.log("imageData", imageData);
      if (
        imageData === "" || fileData === "" 
      ) {
        if (imageData === "") {
          console.log("hello");
          setUploadError("Please upload the Profile Photo");
        }
        if (fileData === "" && values?.userType !== "user") {
          console.log("hello");
          setFileError("Please upload the file");
        }
      } else {
        // const data = {
        //   firstName: values.firstName,
        //   lastName: values.lastName,
        //   email: values.email,
        //   phoneNumber: values.phoneNumber,
        //   password: values.password,
        //   profileImage: imageData,
        //   userType: values.userType,
        // };
        // const reqData = form.values?.userType === "user" ? data : values;
        // console.log("reqData", reqData);

        if (editData?.id) {
          values = { ...values, userId: editData?.id };
        }

        console.log("values", values);
        const link = editData?.id ? "/api/user/edit" : "/api/user/create";
        console.log("link", link);
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
            title: isUpdate ? "Information Updated":"Professional Added",
            message: isUpdate ? "Professional Information Updated Successfully! ":"Professional added Successfully!",
            color: "green.0",
          });
          form.values?.userType === "user"
            ? navigate(routeNames.ngoAdmin.allUsers)
            : navigate(routeNames.ngoAdmin.viewProfessionals);
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
            console.log(link);

            // form.setFieldValue("documentURL", link);
            form.setFieldValue("IDDetails", link);

            setFileData(link);
            setFileUploading(false);
          }
        });
      }
    });
  };

  const handleImageInput = (file, type) => {
    // setFileLoader(true);
    //s3 configs
    const fileName = file.name;
    const sanitizedFileName = fileName.replace(/\s+/g, "");
    setUploadError("");
    setImageUploading(true);
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
            setImageData(link);
            console.log("link", link);
            // form.setFieldValue("documentURL", link);
            form.setFieldValue("profileImage", link);
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
    <Container className={classes.addUser} size="xl" p={"0px"}>
      <ContainerHeader label={id ? "Edit Professional":"Add Professional"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddUser.mutate(values))}
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
                src={isUpdate ? editData?.image : "https://www.w3schools.com/howto/img_avatar.png"}
              //   src={id
              //     ? editData?.profileImage.includes("http") :"https://www.w3schools.com/howto/img_avatar.png"}
              // />
             
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
                handleImageInput(v[0], "pic");
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
              <SelectMenu
                data={[
                  // { label: "User", value: "user" },
                  { label: "Lawyer", value: "lawyer" },
                  { label: "Psychologist", value: "psychologist" },
                  { label: "Social Worker", value: "socialWorker" },
                ]}
                
                disabled={isUpdate ? true : false}
                placeholder={isUpdate ? form.values.userType :"Select role"}
                label="User Type"
                form={form}
                validateName="userType"
              />
            </Grid.Col>
            <Grid.Col sm={6} hidden={form.values.userType === "user"}>
              <Input.Wrapper error={filerror} size={"md"}>
                <FileInput
                  label="Upload Document"
                  placeholder={form.values?.IDDetails !==""? "Uploaded" :"Upload Document"}
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
                  onChange={(e) => handleFileInput(e, "file")}
                />
              </Input.Wrapper>
              {/* {fileLoader && <Loader minHeight="50px" />} */}
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
          {!isUpdate && (
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
          ) }
        
          <Group position="right" mt="sm">
            {/* {fileUploading ? (
              <Loader minHeight="40px" />
            ) : ( */}
            <>
              <Button
                label="Cancel"
                onClick={() => navigate(routeNames.ngoAdmin.viewProfessionals)}
              />

              <Button
                label={isUpdate ? "Update" : "Add Professional"}
                leftIcon={isUpdate ? "":"plus"}
                primary={true}
                type="submit"
                loading={
                  handleAddUser.isLoading || fileUploading || imageUploading
                }
              />
            </>
            {/* )} */}
          </Group>
        </Container>
      </form>
    </Container>
  );
};
