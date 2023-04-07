import { Container, Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { CalendarEvent } from "tabler-icons-react";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import Datepicker from "../../../Components/Datepicker";
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
    if (editData) {
      form.setFieldValue("projectName", editData.projectName);
      form.setFieldValue("description", editData.description);
      form.setFieldValue("startDate", new Date(editData.startDate));
      form.setFieldValue("endDate", new Date(editData.endDate));
    } else form.reset();
  }, [editData]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
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
      values.startDate = new moment(values.startDate).format("YYYY-MM-DD");
      values.endDate = new moment(values.endDate).format("YYYY-MM-DD");
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
          <Grid>
            <Grid.Col sm={6}>
              <Datepicker
                label={"Start Date"}
                icon={<CalendarEvent size={16} />}
                labelFormat={"DD/MM/YYYY"}
                form={form}
                // value={form.values.startDate}
                validateName="startDate"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <Datepicker
                label={"End Date"}
                minDate={new Date(form.values.startDate)}
                form={form}
                validateName="endDate"
                icon={<CalendarEvent size={16} />}
                labelFormat={"DD/MM/YYYY"}
                disabled={
                  form.values.startDate === null || form.values.startDate === ""
                    ? true
                    : false
                }
              />
            </Grid.Col>
          </Grid>

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
              primary={true}
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
