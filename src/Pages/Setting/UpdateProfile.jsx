import {
    Avatar, Container,
    Flex,
    Grid, Group, SimpleGrid, Text
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { CircleX, Upload } from "tabler-icons-react";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import { useStyles } from "./styles";

export const UpdateProfile = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [files, setFiles] = useState([]);

  
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },

    validate: {
      firstName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : "Please enter first name between 2 to 15 characters.",
      lastName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : "Please enter last name between 2 to 15 characters",
      phoneNumber: (value) =>
        value?.length < 8 || value?.length > 12
          ? "Please enter a valid phone number"
          : null,
    },
  });

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Avatar
        size={200}
        key={index}
        src={imageUrl}
        radius="xl"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const handleSettings = useMutation(
    (values) => {
      let formData = new FormData();
      Object.keys(values).forEach(
        (key) => values[key] && formData.append(key, values[key])
      );
      files.length > 0 && formData.append("profileImage", files[0]);
      return axios.post(`${backendUrl + "/api/user/updateProfile"}`, formData, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Profile Updated",
            message: "Profile updated Successfully!",
            color: "green.0",
          });
          navigate(routeNames.socialWorker.dashboard);
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

  const deleteImage = () => {
    setFiles([]);
    setProfileImage("");
  };
  return (
    <Container
      className={classes.container}
      // p={30}
      shadow="sm"
      mt="sm"
      size={"xl"}
    >
      <form onSubmit={form.onSubmit((values) => handleSettings.mutate(values))}>
        <Grid>
          <Grid.Col md={12} p="md" align="center" lg={6}>
            <Container pos={"relative"} className={classes.imageContainer}>
              {/* {(files.length > 0 || profileImage) && (
                <CircleX className={classes.cross} onClick={deleteImage} />
              )} */}
              {files.length > 0 ? (
                previews
              ) : (
                <Avatar
                  size={200}
                  radius="xl"
                  src={
                    profileImage ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
              )}
            </Container>

            <Dropzone
              accept={IMAGE_MIME_TYPE}
              maxFiles={1}
              style={{ width: "150px" }}
              onDrop={(v) => {
                setFiles(v);
              }}
            >
              {/* <Text align="center" className={classes.upload}>
                <Upload size={16} />
                Upload
              </Text> */}
            </Dropzone>
          </Grid.Col>
          <Grid.Col md={12} lg={6}>
            <SimpleGrid
              cols={2}
              spacing="lg"
              breakpoints={[
                { maxWidth: 980, cols: 2, spacing: "md" },
                { maxWidth: 755, cols: 2, spacing: "sm" },
                { maxWidth: 600, cols: 1, spacing: "sm" },
              ]}
            >
              <InputField
                label="First Name"
                required={true}
                placeholder="first name"
                form={form}
                validateName="firstName"
              />
              <InputField
                label="Last Name"
                required={true}
                placeholder="last name"
                form={form}
                validateName="lastName"
              />
              <InputField
                label="Email"
                required={true}
                disabled={true}
                placeholder="xyz@gmail.com"
                form={form}
                validateName="email"
              />
              <InputField
                label="Phone Number"
                required={true}
                placeholder="phone number"
                form={form}
                validateName="phoneNumber"
              />
            </SimpleGrid>
          </Grid.Col>
        </Grid>
        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.socialWorker.dashboard)}
          />
          <Button label="Save Changes" primary={true} type="submit" />
        </Group>
      </form>
    </Container>
  );
};
