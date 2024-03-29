import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import Button from "../../../../Components/Button";
import InputField from "../../../../Components/InputField";
import { useStyles } from "../styles";
import { UserContext } from "../../../../contexts/UserContext";
import { useContext } from "react";
function NewStudiesTrainingModal({
  trainingStudies,
  setTrainingStudies,
  setopenTrainingModal,
  editData,
  setEditData,
}) {
  const { classes } = useStyles();
  const {translate} = useContext(UserContext);

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
        value.length < 1 ? translate("Please enter name") : null,
      specialization: (value) =>
        value.length < 1 ? translate("Please enter name") : null,
      complementaryTraining: (value) =>
        value?.length < 1 ? translate("Please enter center") : null,

      completionYear: (value) =>
        value?.length < 4 || value?.length > 4
          ? translate("Please enter completion year correctly")
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
          placeholder="Education Level"
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
          placeholder="Complementary Training"
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
         label={editData? "Update":"Add"}
         leftIcon={editData? "":"plus"}
          primary={true}
          className={classes.btn}
          type="submit"
        />
        </Group>
      </form>
    </Container>
  );
}
export default NewStudiesTrainingModal;
