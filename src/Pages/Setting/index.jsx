import {
  Anchor,
  Container,
  Flex,
  Grid,
  Group,
  Text,
  Card,
  SimpleGrid,
  Avatar,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Upload } from "tabler-icons-react";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import PassInput from "../../Components/PassInput";
import { useStyles } from "./styles";

export const Setting = () => {
  const { classes } = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: (value) =>
        value.length < 1 ? "Please enter first name" : null,
      lastName: (value) =>
        value?.length < 1 ? "Please enter last name" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value?.length < 8 ? "Password must at least have 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords did not match" : null,
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
      <Text fz={28} fw="bolder" mb="sm" align="center">
        Setting
      </Text>

      <Container className={classes.container} p={30} shadow="sm">
        <Text fz={24} fw="bolder">
          Edit Profile
        </Text>
        <Text size="sm">Fill in the form below to update your profile</Text>
        <Card mt="xl">
          <Grid>
            <Grid.Col span={4} p="md">
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
                <Text align="center" className={classes.upload}><Upload size={16}/>Upload</Text>
              </Dropzone>
            </Grid.Col>
            <Grid.Col span={8}>
              <SimpleGrid
                cols={2}
                spacing="lg"
                breakpoints={[
                  { maxWidth: 980, cols: 2, spacing: "md" },
                  { maxWidth: 755, cols: 2, spacing: "sm" },
                  { maxWidth: 600, cols: 1, spacing: "sm" },
                ]}
              >
                <div>
                  <InputField
                    label="First Name"
                    required={true}
                    placeholder="first name"
                    form={form}
                    validateName="email"
                  />
                </div>
                <div>
                  <InputField
                    label="Last Name"
                    required={true}
                    placeholder="last name"
                    form={form}
                    validateName="email"
                  />
                </div>
                <div>
                  <InputField
                    label="Email"
                    required={true}
                    placeholder="xyz@gmail.com"
                    form={form}
                    validateName="email"
                  />
                </div>
                <div>
                  <InputField
                    label="Phone Number"
                    required={true}
                    placeholder="phone number"
                    form={form}
                    validateName="email"
                  />
                </div>
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </Card>
        <Group position="right">
        <Button 
        label="Cancel"
        />
        <Button 
        label="Save Changes"
        primary={true}
        />
       
        </Group>
        
      </Container>
    </Container>
  );
};

export default Setting;
