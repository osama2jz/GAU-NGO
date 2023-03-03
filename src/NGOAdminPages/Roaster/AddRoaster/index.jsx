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
import moment from "moment";

export const AddRoaster = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [branches, setBranches] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ngoId: user?.ngoId,
      branchId: "",
      scheduleType: "",
      users: "",
      dateStart: "",
      timeStartSlot: "",
      dateEnd: "",
      timeEndSlot: "",
    },

    validate: {
      branchId: (value) => (value?.length < 1 ? "Please Select Branch" : null),
      scheduleType: (value) =>
        value?.length < 1 ? "Please Select Schedule Type" : null,
        users: (value) =>
        value?.length < 1 ? "Please Select at least one user." : null,
      dateStart: (value) =>
        value?.length < 1 ? "Please Select start date." : null,
      dateEnd: (value) =>
        value?.length < 1 ? "Please Select end date." : null,
      timeStartSlot: (value) =>
        value?.length < 1 ? "Please Select start time." : null,
      timeEndSlot: (value) =>
        value?.length < 1 ? "Please Select end time." : null,
    },
  });

  const handleAddRoaster = useMutation(
    (values) => {
      values.ngoId=user.ngoId;
      values.timeStartSlot=moment(values.timeStartSlot).format("HH:mm");
      values.timeEndSlot=moment(values.timeEndSlot).format("HH:mm");
      values.dateStart=moment(values.dateStart).format("YYYY-MM-DD");
      values.dateEnd=moment(values.dateEnd).format("YYYY-MM-DD");
      return axios.post(`${backendUrl + "/api/schedule/create"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Users Scheuled",
            message: "Schedule has been created Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewRoasters);
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

  //API call for fetching all professionals
  const { data: data2, status: status2 } = useQuery(
    "fetchProfessionals",
    () => {
      return axios.get(`${backendUrl + `/api/user/listUsers/professionals`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data?.data?.map((obj, ind) => {
          let user = {
            value: obj._id,
            label: obj.firstName + " " + obj.lastName,
          };
          return user;
        });
        setProfessionals(data);
      },
    }
  );

  //API call for fetching all branches
  const { data, status } = useQuery(
    ["fetchUser"],
    () => {
      return axios.get(`${backendUrl + `/api/ngo/listAllBranches`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
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

  if (handleAddRoaster.isLoading) {
    return <Loader />;
  }

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add Roaster"} />

      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddRoaster.mutate(values))}
      >
        <Grid>
          <Grid.Col sm={6}>
            <SelectMenu
              label="Select Branch"
              required={true}
              placeholder="Select Branch"
              form={form}
              data={branches}
              validateName="branchId"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <SelectMenu
              label="Schedule Type"
              required={true}
              placeholder="Schedule Type"
              form={form}
              data={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
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
              minDate={new Date()}
              validateName="dateStart"
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <Datepicker
              label="End Date"
              required={true}
              placeholder="End Date"
              minDate={new Date(form.values.dateStart)}
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
          validateName="users"
          data={professionals}
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
