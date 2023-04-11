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

export const AddDictionary = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [langauges, setLanguages] = useState([]);
  const { user } = useContext(UserContext);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      languageId: "6429912c360576272cf4acfe",
      actualText: "",
      translatedText: "",
    },

    validate: {
      languageId: (value) =>
        value?.length < 1 ? "Please select your desired language" : null,
      actualText: (value) =>
        /^[A-Za-z_]+$/.test(value)
          ? null
          : "Please enter word you want to translate",
      translatedText: (value) =>
        value?.length < 1 ? "Please enter meaning of the word" : null,
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
      return axios.post(`${backendUrl + "/api/translation/add"}`, values, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Dictionary Added ",
            message: "Dictionary Added Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.ViewDictionary);
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
      <ContainerHeader label={"Add Dictionary"} />
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
              label={"Add"}
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
