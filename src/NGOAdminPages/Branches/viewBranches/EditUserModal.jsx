import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import InputField from "../../../Components/InputField";
import TextArea from "../../../Components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

function ViewUserModal({ id, setOpenEditModal, reportData }) {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState();

  // console.log("reportData", reportData);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      branchId: "",
      branchName: "",
      branchLocation: "",
      branchDescription: "",
    },
    validate: {
      branchName: (value) =>
        /^[a-zA-Z ]{2,40}$/.test(value)
          ? null
          : "Please enter valid branch name.",
      branchLocation: (value) =>
        value?.length < 2 ? "Please enter branch address" : null,
      branchDescription: (value) =>
        value?.length < 1 ? "Please enter branch Description" : null,
    },
  });

  useEffect(() => {
    if (reportData) {
      form.setFieldValue("branchId", reportData.id);
      form.setFieldValue("branchName", reportData?.name);
      form.setFieldValue("branchLocation", reportData?.location);
      form.setFieldValue("branchDescription", reportData?.description);
    }
  }, [reportData]);

  //API call for edit status
  const handleEdit = useMutation(
    (values) => {
      console.log("form.values", form.values);
      return axios.post(`${backendUrl + "/api/ngo/editBranch"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        setOpenEditModal(false);
        navigate(routeNames.ngoAdmin.viewBranches);
        showNotification({
          title: "Status Updated",
          message: "User Status changed Successfully!",
          color: "green.0",
        });
        queryClient.invalidateQueries("fetchBranches");
      },
    }
  );
  return (
    <Container>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleEdit.mutate(values))}
      >
        <InputField
          label="Branch Name"
          required={true}
          placeholder="Branch Name"
          form={form}
          validateName="branchName"
        />
        <InputField
          label="Branch Address"
          required={true}
          placeholder="Branch Address"
          form={form}
          validateName="branchLocation"
        />
        <TextArea
          placeholder={"Branch Details"}
          label="Description"
          rows="4"
          form={form}
          validateName="branchDescription"
          required={true}
        />
        <Group position="right" mt="md">
          <Button
            label={"Save Update"}
            primary={true}
            className={classes.btn}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
}

export default ViewUserModal;
