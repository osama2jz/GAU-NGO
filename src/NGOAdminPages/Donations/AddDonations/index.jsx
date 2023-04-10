import { Avatar, Container, Group, Text, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import SelectMenu from "../../../Components/SelectMenu";
import TextArea from "../../../Components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const AddDonations = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const { user } = useContext(UserContext);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      userId: "",
      amount: "",
      description: "",
      addedBy: user.role === "User" ? user.id : "",
    },

    validate: {
      amount: (value) =>
        /^[a-zA-Z ]{2,40}$/.test(value) ? null : "Please enter amount",
      addedBy: (value) => (value?.length < 1 ? "Please select user" : null),
      description: (value) =>
        value?.length < 2 ? "Please enter description" : null,
    },
  });

  //all users
  const { data: users, status } = useQuery(
    "fetchVerified",
    () => {
      return axios.get(backendUrl + "/api/ngo/listNGOUsers/user/0/0/verified", {
        headers: {
          "x-access-token": user?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response.data.data.map((obj, ind) => {
          if (obj.userStatus === "active") {
            let user = {
              value: obj._id.toString(),
              image: obj?.profileImage,
              label: obj?.firstName + " " + obj?.lastName,
              email: obj?.email || "",
            };
            return user;
          }
        });
        let newData = data.filter((item) => item !== undefined);
        setUserData(newData);
      },
    }
  );

  const handleAddComplaint = useMutation(
    (values) => {
      let data = {
        ...values,
        userId: user.id,
      };
      return axios.post(`${backendUrl + "/api/donation/donate"}`, data, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Amount Donated ",
            message: "Amount Donated Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewDonations);
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

  const SelectItem = ({ image, label, email, ...others }) => (
    <div {...others}>
      <Group noWrap>
        <Avatar src={image}>{label[0].toUpperCase()}</Avatar>

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {email}
          </Text>
        </div>
      </Group>
    </div>
  );
  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Make Donation"} />
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddComplaint.mutate(values))}
      >
        <Container className={classes.innerContainer} size="xl">
          {user.role !== "User" && (
            <SelectMenu
              searchable={true}
              itemComponent={SelectItem}
              placeholder="Enter User name or Id"
              clearable={true}
              required
              form={form}
              validateName="addedBy"
              label="Search User"
              data={userData}
            />
          )}
          <InputField
            label="Amount"
            placeholder="Amount (€)"
            form={form}
            required
            type={"number"}
            validateName="amount"
          />

          <TextArea
            label="Description"
            placeholder="Description"
            form={form}
            required
            validateName="description"
          />
          <Group position="right" mt="sm">
            <Button label="Cancel" onClick={() => navigate(-1)} />
            <Button
              label={"Donate"}
              bg={true}
              type="submit"
              leftIcon={"euro"}
            />
          </Group>
        </Container>
      </form>
    </Container>
  );
};
