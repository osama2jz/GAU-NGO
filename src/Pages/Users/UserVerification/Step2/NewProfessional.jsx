import { Container } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import { useStyles } from "../styles";

function NewProfessionalModal() {
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      center: "",
    },

    validate: {
      name: (value) => (value.length < 1 ? "Please enter name" : null),
      center: (value) => (value?.length < 1 ? "Please enter center" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value?.length < 8 ? "Please enter phone number" : null,
    },
  });
  return (
    <Container>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => console.log("value", values))}
      >
        <InputField
          label="Name"
          placeholder="name"
          form={form}
          validateName="name"
        />
        <InputField
          label="Email"
          // required={true}
          placeholder="email@gmail.com"
          form={form}
          validateName="email"
        />
        <InputField
          label="Phone"
          // required={true}
          placeholder="+92 123 456 7890"
          form={form}
          validateName="phone"
        />
        <InputField
          label="Center"
          // required={true}
          placeholder="center"
          form={form}
          validateName="center"
        />
        <Button
          label={"Add"}
          primary={true}
          className={classes.btn}
          type="submit"
        />
      </form>
    </Container>
  );
}

export default NewProfessionalModal;
