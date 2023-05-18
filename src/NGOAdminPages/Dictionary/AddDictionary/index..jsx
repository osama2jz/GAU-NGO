import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import InputField from "../../../Components/InputField";
import routeNames from "../../../Routes/routeNames";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import { useStyles } from "./styles";

export const AddDictionary = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user, translate } = useContext(UserContext);
  const { state } = useLocation();
  const { editData } = state ?? "";
  const [langauges, setLanguages] = useState([]);
  useEffect(() => {
    if (editData) {
      form.setFieldValue("actualText", editData.actualWord);
      form.setFieldValue("translatedText", editData.translated);
      form.setFieldValue("translationId", editData.id);
    } else {
      form.reset();
    }
  }, [editData]);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      languageId: "6429912c360576272cf4acfe",
      actualText: "",
      translatedText: "",
    },

    validate: {
      languageId: (value) =>
        value?.length < 1
          ? translate("Please select your desired language")
          : null,
      actualText: (value) =>
        value?.length > 0
          ? null
          : translate("Please enter word you want to translate"),
      translatedText: (value) =>
        value?.length < 1
          ? translate("Please enter meaning of the word")
          : null,
    },
  });

  //all languages
  const { data: users, status } = useQuery(
    "fetchLangauges",
    () => {
      return axios.get(backendUrl + "/api/lookup/getLookupByType/language", {
        headers: {
          "x-access-token": user?.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        let data = response?.data?.data?.map((obj, ind) => {
          let lang = {
            value: obj._id,
            label: obj?.lookupName,
          };
          return lang;
        });
        setLanguages(data);
      },
    }
  );

  const handleAddWord = useMutation(
    (values) => {
      let url = editData ? "edit" : "add";
      // values.actualText = (
      //   values.actualText.slice(0, 1).toUpperCase() + values.actualText.slice(1)
      // ).trim();
      // values.translatedText =
      //   values.translatedText.slice(0, 1).toUpperCase() +
      //   values.translatedText.slice(1);
      return axios.post(`${backendUrl + "/api/translation/" + url}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          let word = editData ? "Updated" : "Added";
          showNotification({
            title:translate(`Dictionary ${word}`),
            message: translate(`Dictionary ${word} Successfully!`),
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.ViewDictionary);
        } else {
          showNotification({
            title: translate("Failed"),
            message: translate(response?.data?.message),
            color: "red.0",
          });
        }
      },
    }
  );
  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader
        label={editData ? "Update Dictionary" : "Add Dictionary"}
      />
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleAddWord.mutate(values))}
      >
        <Container className={classes.innerContainer} size="xl">
          {/* <SelectMenu
            searchable={true}
            placeholder="Search Language"
            clearable={true}
            required
            form={form}
            validateName="languageId"
            label="Select Language"
            data={langauges}
            pb="sm"
          /> */}

          <InputField
            label="English Word"
            placeholder="English Word"
            form={form}
            required
            validateName="actualText"
          />

          <InputField
            label="Spanish Meaning"
            placeholder="Spanish Meaning"
            form={form}
            required
            validateName="translatedText"
          />
          <Group position="right" mt="sm">
            <Button label="Cancel" onClick={() => navigate(-1)} />
            <Button
              label={editData ? "Update" : "Add Word"}
              bg={true}
              type="submit"
              leftIcon={"plus"}
              loading={handleAddWord.isLoading}
            />
          </Group>
        </Container>
      </form>
    </Container>
  );
};
