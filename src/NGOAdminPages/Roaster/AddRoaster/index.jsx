import { Avatar, Container, Grid, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import Datepicker from "../../../Components/Datepicker";
import MultiSelect from "../../../Components/MultiSelect";
import SelectMenu from "../../../Components/SelectMenu";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";
import ViewModal from "./ViewModal";

export const AddRoaster = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user ,translate} = useContext(UserContext);
  const [branches, setBranches] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [opened, setOpened] = useState(false);
  const [select, setSelect] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ngoId: user?.ngoId,
      branchId: "",
      // scheduleType: "",
      users: "",
      dateStart: "",
      // timeStartSlot: "",
      dateEnd: "",
      // timeEndSlot: "",
    },

    validate: {
      branchId: (value) => (value?.length < 1 ? translate("Please Select Branch") : null),
      // scheduleType: (value) =>
      //   value?.length < 1 ? "Please Select Schedule Type" : null,
      // users: (value) =>
      //   value?.length < 1 ? "Please Select at least one user." : null,
      dateStart: (value) =>
        value?.length < 1 ? translate("Please Select start date.") : null,
      dateEnd: (value) =>
        value?.length < 1 ? translate("Please Select end date.") : null,
    },
  });

  const selectedProfessional = professionals?.filter((item) =>
    select?.includes(item.value)
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const selectedBranch = branches?.filter(
    (item) => item.value === form.values.branchId
  );

  const handleAddRoaster = useMutation(
    (values) => {
      let obj = {
        ngoId: user?.ngoId,
        branchId: values?.branchId,
        dateStart: moment(values?.dateStart).format("YYYY-MM-DD"),
        dateEnd: moment(values?.dateEnd).format("YYYY-MM-DD"),
        users: select,
      };

      console.log(obj);
      return axios.post(`${backendUrl + "/api/schedule/create"}`, obj, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          if (response?.data?.message[0]?.scheduleMessage) {
            // navigate(routeNames.ngoAdmin.viewRoasters);
            showNotification({
              title: "Failed",
              message: response?.data?.message[0]?.scheduleMessage,
              color: "red.0",
            });
          } else {
            showNotification({
              title: translate("Users Scheuled"),
              message: translate("Schedule has been created Successfully!"),
              color: "green.0",
            });
            navigate(routeNames.ngoAdmin.viewRoasters);
          }
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
    "fetchAllProfessionals",
    () => {
      return axios.get(`${backendUrl + `/api/user/listUsers/all/0/0`}`, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data?.data
          ?.filter((obj) => obj.userStatus === "active")
          .map((obj, ind) => {
            let user = {
              value: obj._id,
              label: ind + 1 + ". " + obj.firstName + " " + obj.lastName,
              email: obj?.email,
              image: obj?.profileImage,
              role:
                obj?.userType === "socialWorker"
                  ? "Social Worker"
                  : obj?.userType === "lawyer"
                  ? "Lawyer"
                  : "Psychologist",
            };
            // console.log("user", user);
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
          if (obj?.branchStatus === "active") {
            let branch = {
              value: obj._id,
              label: obj.branchName,
            };
            return branch;
          }
        });
        let filteredData = data.filter((obj) => obj !== undefined);
        setBranches(filteredData);
      },
    }
  );

  const SelectItem = ({ image, label, role, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image}>{label.split(" ")[1][0]}</Avatar>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {role}
          </Text>
        </div>
      </Group>
    </div>
  );

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add Roaster"} />

      <form
        className={classes.form}
        // onSubmit={form.onSubmit((values) => handleAddRoaster.mutate(values))}
        onSubmit={form.onSubmit((values) => {
          if (select.length === 0) {
            showNotification({
              title: "Failed",
              message: translate("Please select at least one user."),
              color: "red.0",
            });
          } else {
            setOpened(true);
          }
        })}
      >
        <Grid>
          <Grid.Col sm={12}>
            <SelectMenu
              label="Select Branch"
              required={true}
              placeholder="Select Branch"
              form={form}
              data={branches}
              validateName="branchId"
              searchable={true}
            />
          </Grid.Col>
          {/* <Grid.Col sm={6}>
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
          </Grid.Col> */}
        </Grid>
        <Grid>
          <Grid.Col sm={6}>
            <Datepicker
              label="Start Date"
              required={true}
              placeholder="Start Date"
              form={form}
              minDate={tomorrow}
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

        <MultiSelect
          label="Select Users"
          // form={form}
          required={true}
          setData={setSelect}
          placeholder="Select Users"
          itemComponent={SelectItem}
          validateName="users"
          data={professionals}
          searchable={true}
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
            // loading={handleAddRoaster.isLoading}
            // onClick={()=>setOpened(true)}
          />
        </Group>
      </form>
      <ViewModal
        setOpened={setOpened}
        opened={opened}
        startDate={form.values.dateStart}
        endDate={form.values.dateEnd}
        selectedProfessional={selectedProfessional}
        selectedBranch={selectedBranch}
        // onSubmit={() => alert("hello")}
        loading={handleAddRoaster.isLoading}
        onSubmit={() => handleAddRoaster.mutate(form.values)}
      />
    </Container>
  );
};
