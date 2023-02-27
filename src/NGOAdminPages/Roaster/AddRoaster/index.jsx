import { Container, Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import SelectMenu from "../../../Components/SelectMenu";
import TextArea from "../../../Components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const AddRoaster = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ngoId:"",
      branchId:"",
      scheduledType:"",
      userId:"",
      dateStart:"",
      timeStartSlot:"",
      dateEnd:"",
      timeEndSlot:"",
    },

    validate: {
     
    },
  });

  const handleAddBranch = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/ngo/createBranch"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Branch Added",
            message: "New Branch added Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewBranches);
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

  if (handleAddBranch.isLoading) {
    return <Loader />;
  }

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add Branch"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddBranch.mutate(values))}
      >
        <Grid>
          <Grid.Col sm={6}>
            <SelectMenu
              label="Select Branch"
              required={true}
              placeholder="Select Branch"
              form={form}
              data={[]}
              validateName="branchName"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <InputField
              label="Branch Address"
              required={true}
              placeholder="Branch Address"
              form={form}
              validateName="branchLocation"
            />
          </Grid.Col>
        </Grid>
        <TextArea
          placeholder={"Branch Details"}
          label="Description"
          rows="4"
          form={form}
          validateName="description"
        />

        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.ngoAdmin.viewBranches)}
          />
          <Button
            label="Add Branch"
            leftIcon={"plus"}
            primary={true}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
};
