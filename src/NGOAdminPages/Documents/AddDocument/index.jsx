import { Container, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import ContainerHeader from "../../../Components/ContainerHeader";
import Loader from "../../../Components/Loader";
import SelectMenu from "../../../Components/SelectMenu";
import TextEditor from "../../../Components/TextEditor";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import routeNames from "../../../Routes/routeNames";
import { useStyles } from "./styles";

export const AddDocument = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [documents, setDocuments] = useState([]);
  const [editor, setEditor] = useState("");

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
    "fetchDocuments",
    () => {
      return axios.get(
        `${backendUrl + `/api/lookup/getLookupByType/documentTypes`}`,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        let data = response.data?.data?.map((obj, ind) => {
          let document = {
            value: obj._id,
            label: obj.lookupName,
          };
          return document;
        });
        setDocuments(data);
      },
    }
  );

  if (handleAddBranch.isLoading) {
    return <Loader />;
  }

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Add Document"} />
      <form className={classes.form}>
        <SelectMenu
          label={"Select Document"}
          placeholder="Document Type"
          data={documents}
          pb="md"
        />
        <TextEditor value={editor} onChange={setEditor} />
        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.ngoAdmin.viewRoasters)}
          />
          <Button
            label="Add Document"
            leftIcon={"plus"}
            primary={true}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
};
