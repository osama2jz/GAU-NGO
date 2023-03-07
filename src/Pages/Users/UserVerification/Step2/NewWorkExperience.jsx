import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import { useStyles } from "../styles";
import moment from "moment";
import Datepicker from "../../../../Components/Datepicker";
function NewWorkModal({setOpenModal, workExperience, setWorkExperience }) {
  const { classes } = useStyles();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      position: "",
      contract: "",
      enterprise: "",
      duration: "",
      endDate: "",
      startDate: "",
    },
    validate: {
      position: (value) => (value.length < 1 ? "Please enter name" : null),
      contract: (value) => (value?.length < 1 ? "Please enter contract" : null),
      enterprise: (value) =>
        value?.length < 1 ? "Please enter enterprise" : null,
      duration: (value) => (value?.length < 1 ? "Please enter duration" : null),
      endDate: (value) => (value?.length < 1 ? "Please enter endDate" : null),
      startDate: (value) =>
        value?.length < 1 ? "Please enter startDate" : null,
    },
  });
  const AddWorkExperience = (values) => {
    values.id = workExperience.length + 1;
    values.endDate = moment(values.endDate).format("DD/MM/YYYY");
    values.startDate = moment(values.startDate).format("DD/MM/YYYY");
    setWorkExperience([...workExperience, values]);
    form.reset();
    setOpenModal(false);
  };

  return (
    <Container>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(AddWorkExperience)}
      >
        <InputField
          label="Position"
          placeholder="position"
          form={form}
          validateName="position"
        />
        <InputField
          label="Job Type"
          required={true}
          placeholder="job type"
          form={form}
          validateName="contract"
        />
        <InputField
          label="Enterprise"
          required={true}
          placeholder="enterprise"
          form={form}
          validateName="enterprise"
        />
        <InputField
          label="Duration"
          required={true}
          placeholder="duration"
          form={form}
          validateName="duration"
        />
        <Datepicker
          placeholder="Start Date"
          label="Start Date"
          maxDate={new Date()}
          className={classes.input}
          {...form?.getInputProps("startDate")}
        />
        <Datepicker
          label="End Date"
          // disabled={form.values.startDate === ""}
          placeholder="End Date"
          className={classes.input}
          maxDate={new Date()}
          minDate={new Date(form.values.startDate)}
          {...form?.getInputProps("endDate")}
        />
        <Group position="right" mt="md">
          <Button
            label={"Add"}
            primary={true}
            leftIcon={"plus"}
            className={classes.btn}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
}
export default NewWorkModal;
