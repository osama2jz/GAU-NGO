import {
  Avatar,
  Container,
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
  const { user, translate } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    form.setValues(user);
  }, [user]);
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
          : translate("Please enter first name between 2 to 15 characters."),
      lastName: (value) =>
        /^[a-zA-Z ]{2,15}$/.test(value)
          ? null
          : translate("Please enter last name between 2 to 15 characters"),
      phoneNumber: (value) =>
        /^(\+34\s?)?(\d{2}|\(\d{2}\))[\s\-]?\d{4}[\s\-]?\d{3}$/.test(value)
          ? null
          : translate("Please enter valid phone number"),
    },
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
            title: translate("Profile Updated"),
            message: translate("Profile updated Successfully"),
            color: "green.0",
          });
          navigate(routeNames.socialWorker.dashboard);
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
              <Avatar
                size={200}
                radius="xl"
                className={classes.image}
                src={
                  profileImage ||
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
              />
            </Container>
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
                component={ReactInputMask}
                mask="+34 99 9999 999"
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
          <Button
            label="Save Changes"
            primary={true}
            type="submit"
            loading={handleSettings.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
