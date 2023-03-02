import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEditor } from "@tiptap/react";
import axios from "axios";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useContext, useEffect, useState } from "react";
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
import { Link } from "@mantine/tiptap";
import {useLocation} from 'react-router-dom'

export const AddDocument = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [documents, setDocuments] = useState([]);

  let { state } = useLocation();

  const {
    editdata
  } = state ?? "";

  

  const editorr = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: editdata?.content,
  });

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      lookupId: "",
      documentId:""
    },

    validate: {
      lookupId: (value) =>
        value?.length < 1 ? "Please Select Document Type" : null,
    },
  });

  useEffect(() => {
    if (editdata) {
      form.setFieldValue("lookupId", editdata?.lookupId);
      form.setFieldValue("documentId", editdata?.id);
      // editorr.commands.setContent(editdata?.content);
    }
  },[editdata])

  const handleAddDocument = useMutation(
    (values) => {
      values.documentText = editorr.getHTML();
      return axios.post(
        `${backendUrl + "/api/lookup/createDocuments"}`,
        values,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Document Created",
            message: "New Document Created Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewDocuments);
        } else {
          showNotification({
            title: "Failed",
            message: "Document Already Exists!",
            color: "red.0",
          });
        }
      },
    }
  );

  const handleEditDocument = useMutation(
    (values) => {
      values.documentText = editorr.getHTML();
      return axios.post(
        `${backendUrl + "/api/lookup/updateDocument"}`,
        values,
        {
          headers: {
            "x-access-token": user.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Document Created",
            message: "Document Updated Successfully!",
            color: "green.0",
          });
          navigate(routeNames.ngoAdmin.viewDocuments);
        } else {
          showNotification({
            title: "Failed",
            message: "Failed to Update Document!",
            color: "red.0",
          });
        }
      },
    }
  );
  //API call for fetching all documents
  const { data, status } = useQuery(
    "fetchDocumentsTypes",
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

  if (handleAddDocument.isLoading) {
    return <Loader />;
  }

 

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={editdata ? "Edit Document":"Add Document"} />
      <form
        className={classes.form}
        
        onSubmit={form.onSubmit((values) => editdata ? handleEditDocument.mutate(values):handleAddDocument.mutate(values))}
      >
        <SelectMenu
          label={"Select Document"}
          placeholder="Document Type"
          data={documents}
          pb="md"
          form={form}
          validateName="lookupId"
        />
        <TextEditor editor={editorr} />
        <Group position="right" mt="sm">
          <Button
            label="Cancel"
            onClick={() => navigate(routeNames.ngoAdmin.viewDocuments)}
          />
          <Button
            label={editdata ? "Update Document":"Add Document"}
            leftIcon={"plus"}
            primary={true}
            type="submit"
          />
        </Group>
      </form>
    </Container>
  );
};
