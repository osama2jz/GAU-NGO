import { Container } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import { useStyles } from "../styles";
function NewStudiesTrainingModal({
  trainingStudies,
  setTrainingStudies,
  setopenTrainingModal,
  editData,
  setEditData,
}) {
  const { classes } = useStyles();
  console.log("editData", editData)

  useEffect(() => {
    if (editData) {
      form.setValues(editData);
    }
  }, [editData]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      educationLevel: "",
      specialization: "",
      complementaryTraining: "",
      completionYear: "",
    },
    validate: {
      educationLevel: (value) =>
        value.length < 1 ? "Please enter name" : null,
      specialization: (value) =>
        value.length < 1 ? "Please enter name" : null,
      complementaryTraining: (value) =>
        value?.length < 1 ? "Please enter center" : null,

      completionYear: (value) =>
        value?.length < 4 || value?.length > 4
          ? "Please enter completion year correctly"
          : null,
    },
  });

  const addRefrences = (values) => {
    if (editData) {
      const index = trainingStudies.findIndex(
        (item) => item.id === editData.id
      );
      console.log("index", index);
      trainingStudies[index] = values;
      setTrainingStudies([...trainingStudies]);
      setopenTrainingModal(false);
      form.reset();
      setEditData("");
    } else {
      values.id = trainingStudies.length + 1;
      setTrainingStudies([...trainingStudies, values]);
      setopenTrainingModal(false);
      form.reset();
    }
  };
  return (
    <Container>
      <form className={classes.form} onSubmit={form.onSubmit(addRefrences)}>
        <InputField
          label="Education Level"
          required={true}
          placeholder="Education Level "
          form={form}
          validateName="educationLevel"
        />
        <InputField
          label="Specialization"
          required={true}
          placeholder="specialization"
          form={form}
          validateName="specialization"
        />
        <InputField
          label="Complementary Training"
          required={true}
          placeholder="complementaryTraining"
          form={form}
          validateName="complementaryTraining"
        />
        <InputField
          label="Completion Year"
          required={true}
          placeholder="Completion Year"
          form={form}
          validateName="completionYear"
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
export default NewStudiesTrainingModal;
