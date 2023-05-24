import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect } from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import { useStyles } from "../styles";
import moment from "moment";
import Datepicker from "../../../../Components/Datepicker";
import { UserContext } from "../../../../contexts/UserContext";
function NewWorkModal({
  setOpenModal,
  workExperience,
  setWorkExperience,
  editData,
  setEditData,
}) {
  const { translate } = useContext(UserContext);
  const { classes } = useStyles();
  useEffect(() => {
    if (editData) {
      form.setValues(editData);
    }
  }, [editData]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      position: "",
      contract: "",
      enterprise: "",
      duration: "",
      endDate: null,
      startDate: null,
      noOfYears: "",
    },
    validate: {
      position: (value) =>
        value.length < 1 ? translate("Please enter name") : null,
      contract: (value) =>
        value?.length < 1 ? translate("Please enter contract") : null,
      enterprise: (value) =>
        value?.length < 1 ? translate("Please enter enterprise") : null,
      duration: (value) =>
        value?.length < 1 ? translate("Please enter duration") : null,
      endDate: (value) => (!value ? translate("Please enter End Date") : null),
      startDate: (value) =>
        !value ? translate("Please enter Start Date") : null,
      noOfYears: (value) =>
        value?.length < 1 || value?.length > 2
          ? translate("Please enter year")
          : null,
    },
  });
  const AddWorkExperience = (values) => {
    if (editData) {
      const index = workExperience.findIndex((item) => item.id === editData.id);
      values.id = workExperience.length + 1;
      // values.endDate = new Date(values.endDate);
      // values.startDate = new Date(values.startDate);
      values.endDate = moment(values.endDate).format("DD-MM-YYYY");
      values.startDate = moment(values.startDate).format("DD-MM-YYYY");
      workExperience[index] = values;
      setWorkExperience([...workExperience]);

      setOpenModal(false);
      form.reset();
      setEditData("");
    } else {
      values.id = workExperience.length + 1;
      values.endDate = moment(values.endDate).format("DD-MM-YYYY");
      values.startDate = moment(values.startDate).format("DD-MM-YYYY");
      setWorkExperience([...workExperience, values]);
      form.reset();
      setOpenModal(false);
    }
  };
  console.log(form.errors);
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
          label="Years"
          required={true}
          placeholder="Years"
          form={form}
          validateName="noOfYears"
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
          required={true}
          maxDate={new Date()}
          className={classes.input}
          form={form}
          validateName="startDate"
        />
        <Datepicker
          label="End Date"
          placeholder="End Date"
          required={true}
          className={classes.input}
          maxDate={new Date()}
          form={form}
          minDate={new Date(form.values.startDate)}
          validateName="endDate"
        />
        <Group position="right" mt="md">
          <Button
            label={"Reset"}
            className={classes.btn}
            onClick={() => {
              form.reset();
              setEditData("");
            }}
          />
          <Button
            label={editData ? "Update" : "Add"}
            leftIcon={editData ? "" : "plus"}
            primary={true}
            className={classes.btn}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
}
export default NewWorkModal;
