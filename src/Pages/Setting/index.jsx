import {
  Container,
  Flex,
  Grid,
  Group,
  Text,
  Card,
  SimpleGrid,
  Avatar,
  Image,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Upload } from "tabler-icons-react";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import { useStyles } from "./styles";
import Settings from "../../assets/cogwheel.png";
import routeNames from "../../Routes/routeNames";
import { useNavigate } from "react-router";
import ContainerHeader from "../../Components/ContainerHeader";

export const Setting = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },

    validate: {
      firstName: (value) =>
        value.length < 1 ? "Please enter first name" : null,
      lastName: (value) =>
        value?.length < 1 ? "Please enter last name" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Avatar
        size={150}
        key={index}
        src={imageUrl}
        radius="xl"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });
  return (
    <Container className={classes.main} size="lg">
      <ContainerHeader label={"Settings"} />

      <Container className={classes.container} p={30} shadow="sm" mt="sm">
        <form
          onSubmit={form.onSubmit((values) => console.log("value", values))}
        >
          <Grid>
            <Grid.Col md={4} p="md" align="center">
              {files.length > 0 ? (
                previews
              ) : (
                <Avatar
                  size={150}
                  radius="xl"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                />
              )}

              <Dropzone
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                style={{ width: "150px" }}
                onDrop={(v) => {
                  setFiles(v);
                }}
              >
                <Text align="center" className={classes.upload}>
                  <Upload size={16} />
                  Upload
                </Text>
              </Dropzone>
            </Grid.Col>
            <Grid.Col md={8}>
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
                  placeholder="xyz@gmail.com"
                  form={form}
                  validateName="email"
                />
                <InputField
                  label="Phone Number"
                  required={true}
                  placeholder="phone number"
                  form={form}
                  validateName="phone"
                />
              </SimpleGrid>
            </Grid.Col>
          </Grid>
          <Flex justify={"flex-end"} gap={"md"}>
            <Button
              label="Cancel"
              onClick={() => navigate(routeNames.socialWorker.dashboard)}
            />
            <Button label="Save Changes" primary={true} type="submit" />
          </Flex>
        </form>
      </Container>
    </Container>
  );
};

export default Setting;
