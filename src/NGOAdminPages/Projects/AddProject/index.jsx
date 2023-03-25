import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import TextArea from "../../../Components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

const AddProject = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { state } = useLocation();
  let editData = state?.editData;

  useEffect(() => {
    console.log(editData);
    if (editData) form.setValues(editData);
    else form.reset();
  }, [editData]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      projectName: "",
      description: "",
    },

    validate: {
      projectName: (value) =>
        /^[a-zA-Z0-9 ]{2,50}$/.test(value)
          ? null
          : "Please enter a valid project name.",
      description: (value) =>
        value?.length < 2 ? "Please enter description" : null,
    },
  });

  const handleAddProject = useMutation(
    (values) => {
      let link = backendUrl + "/api/project/create";
      if (editData) {
        link = backendUrl + "/api/project/edit";
        values.projectId = editData.id;
      }
      return axios.post(link, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Project",
            message: "Project added Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewProject);
        } else {
          showNotification({
            title: "Failed",
            message: response?.data?.message,
            color: "red.0",
          });
        }
      },
    }
  );

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={editData ? "Update Project" : "Add Project"} />
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddProject.mutate(values))}
      >
        <Container className={classes.innerContainer} size="xl">
          <InputField
            label="Project Name"
            placeholder="Enter Project Name"
            form={form}
            validateName="projectName"
            required={"true"}
            maxLength={50}
          />

          <TextArea
            label="Description"
            placeholder="Enter Project Description"
            form={form}
            validateName="description"
            required={"true"}
          />
          <Group position="right" mt="sm">
            <Button
              label="Cancel"
              onClick={() => navigate(routeNames.ngoAdmin.viewProject)}
            />
            <Button
              label={editData ? "Update Project" : "Add Project"}
              bg={true}
              type="submit"
              loading={handleAddProject.isLoading}
              leftIcon={"plus"}
            />
          </Group>
        </Container>
      </form>
    </Container>
  );
};
export default AddProject;
