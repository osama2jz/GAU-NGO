import { Container } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import { useStyles } from "../styles";
function NewProfessionalModal({refrences,setRefrences,setOpenViewModal}) {
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      center: "",
      relation:""
    },
    validate: {
      fullName: (value) => (value.length < 1 ? "Please enter name" : null),
      center: (value) => (value?.length < 1 ? "Please enter center" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value?.length < 8 ? "Please enter phone number" : null,
    },
  });

  const addRefrences = (values) => {
    values.id=refrences.length+1;
    setRefrences([...refrences, values]);
    setOpenViewModal(false);
    form.reset();
  }
  return (
    <Container>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(addRefrences)}
      >
        <InputField
          label="Name"
          placeholder="name"
          form={form}
          validateName="fullName"
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
        <InputField
          label="Relation"
          // required={true}
          placeholder="relation"
          form={form}
          validateName="relation"
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
