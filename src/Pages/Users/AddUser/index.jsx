import { Anchor, Container, Flex, Grid, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import PassInput from "../../../Components/PassInput";
import { useStyles } from "./styles";
import SubmitModal from "./SubmitEmail";

export const AddUser = () => {
  const { classes } = useStyles();
  const [showModal, setShowModal] = useState(false);

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
  return (
    <Container className={classes.addUser} size="lg">
      <Text fz={"xl"} fw="bolder" align="center"className={classes.heading}>
        Add User
      </Text>

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => console.log("value", values))}
      >
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
        <InputField
          label="Email"
          required={true}
          placeholder="xyz@gmail.com"
          form={form}
          validateName="email"
        />
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
        <Text pb={"sm"} size="sm">
          By pressing “Submit” I declare that i’ve read and agree to the{" "}
          <b>GAU</b> <Anchor color={"green"}>Terms and Conditions.</Anchor>
        </Text>
        <Group position="right">
          <Button label="Submit" primary={true} type="submit" />
        </Group>
      </form>
      <SubmitModal opened={showModal} setOpened={setShowModal} />
    </Container>
  );
};
