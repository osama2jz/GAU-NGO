import { Container, Group, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import ContainerHeader from "../../Components/ContainerHeader";
import TextEditor from "../../Components/TextEditor";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import routeNames from "../../Routes/routeNames";
import { useStyles } from "./styles";

const userForms = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("consent");

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
    content: "",
  });

  const editorr2 = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const handleEditDocument = useMutation(
    () => {
      let data = {
        documentId:
          activeTab === "consent"
            ? "6400a0cbc1e434001488c999"
            : "64004aecf911ad001467a805",
        documentText:
          activeTab === "consent" ? editorr.getHTML() : editorr2.getHTML(),
        lookupId:
          activeTab === "consent"
            ? "63fd997d55c36b0014b38599"
            : "63fd998555c36b0014b3859b",
      };
      return axios.post(`${backendUrl + "/api/lookup/updateDocument"}`, data, {
        headers: {
          "x-access-token": user.token,
        },
      });
    },
    {
      onSuccess: (response) => {
        if (response.data.status) {
          showNotification({
            title: "Document Created",
            message: "Document Updated Successfully!",
            color: "green.0",
          });
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

  const _ = useQuery(
    "fetchConsent",
    () => {
      return axios.get(
        backendUrl + "/api/lookUp/listDocumentByType/63fd997d55c36b0014b38599",
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        editorr?.commands.insertContent(response.data.data.documentText);
      },
      refetchOnWindowFocus: false,
    }
  );
  const __ = useQuery(
    "agreement",
    () => {
      return axios.get(
        backendUrl + "/api/lookUp/listDocumentByType/63fd998555c36b0014b3859b",
        {
          headers: {
            "x-access-token": user?.token,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        editorr2?.commands.insertContent(response.data.data.documentText);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container className={classes.addUser} size="xl">
      <ContainerHeader label={"Update User Forms"} />
      <Tabs
        variant="pills"
        value={activeTab}
        color={"blue.0"}
        onTabChange={setActiveTab}
        classNames={{
          root: classes.tab,
          tabsList: classes.tabList,
          tab: classes.tabs,
        }}
      >
        <Tabs.List grow>
          <Tabs.Tab value="consent">Consent Form</Tabs.Tab>
          <Tabs.Tab value="agreement">Agreement Form</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="consent" pt="xs">
          <TextEditor editor={editorr} />
          <Group position="right" mt="sm">
            <Button
              label="Cancel"
              onClick={() => navigate(routeNames.ngoAdmin.viewDocuments)}
            />
            <Button
              label={"Update Document"}
              leftIcon={"plus"}
              primary={true}
              onClick={handleEditDocument.mutate}
              loading={handleEditDocument.isLoading}
            />
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="agreement" pt="xs">
          <TextEditor editor={editorr2} />
          <Group position="right" mt="sm">
            <Button
              label="Cancel"
              onClick={() => navigate(routeNames.ngoAdmin.viewDocuments)}
            />
            <Button
              label={"Update Document"}
              leftIcon={"plus"}
              primary={true}
              onClick={handleEditDocument.mutate}
              loading={handleEditDocument.isLoading}
            />
          </Group>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};
export default userForms;
