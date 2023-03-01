import { Container, Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import Datepicker from "../../../Components/Datepicker";
import InputField from "../../../Components/InputField";
import Loader from "../../../Components/Loader";
import MultiSelect from "../../../Components/MultiSelect";
import SelectMenu from "../../../Components/SelectMenu";
import TextArea from "../../../Components/TextArea";
import Timepicker from "../../../Components/Timepicker";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const AddRoaster = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [branches, setBranches]=useState([])

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ngoId: "",
      branchId: "",
      scheduledType: "",
      userId: "",
      dateStart: "",
      timeStartSlot: "",
      dateEnd: "",
      timeEndSlot: "",
    },

    validate: {},
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

  //API call for fetching all branches
  const { data, status } = useQuery(
    ["fetchUser"],
    () => {
      return axios.get(
        `${
          backendUrl +
          `/api/ngo/listAllBranches`
        }`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data.data[0].ngoBranches.map((obj, ind) => {
          let branch = {
            value: obj._id,
            label: obj.branchName,
          };
          return branch;
        });
        setBranches(data);
      },
    }
  );

  if (handleAddBranch.isLoading) {
    return <Loader />;
  }

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add Roaster"} />

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
              data={branches}
              validateName="branchName"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <SelectMenu
              label="Schedule Type"
              required={true}
              placeholder="Schedule Type"
              form={form}
              data={[]}
              validateName="scheduleType"
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col sm={6}>
            <Datepicker
              label="Start Date"
              required={true}
              placeholder="Start Date"
              form={form}
              validateName="dateStart"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <Datepicker
              label="End Date"
              required={true}
              placeholder="End Date"
              form={form}
              validateName="dateEnd"
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col sm={6}>
            <Timepicker
              label="Start Time"
              required={true}
              placeholder="Start Time"
              form={form}
              validateName="timeStartSlot"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <Timepicker
              label="End Time"
              required={true}
              placeholder="End Time"
              form={form}
              validateName="timeEndSlot"
            />
          </Grid.Col>
        </Grid>
        <MultiSelect
          label="Select Users"
          form={form}
          placeholder="Select Users"
          validateName="userId"
          data={[]}
        />

        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.ngoAdmin.viewRoasters)}
          />
          <Button
            label="Add Roaster"
            leftIcon={"plus"}
            primary={true}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
};
