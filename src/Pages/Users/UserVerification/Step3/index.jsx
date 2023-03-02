import { Checkbox, Container, Text } from "@mantine/core";
import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import Loader from "../../../../Components/Loader";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import ReactHtmlParser from "react-html-parser";

export const Step3 = ({ setConsentSignature }) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);

  //API call for fetching conset form
  const { data, status } = useQuery("fetchConsent", () => {
    return axios.get(
      `${
        backendUrl + `/api/lookup/listDocumentByType/63fd997d55c36b0014b38599`
      }`,
      {
        headers: {
          "x-access-token": user.token,
        },
      }
    );
  });

  if (status === "loading") {
    return <Loader />;
  }
  return (
    <Container size="xl" p={"lg"} className={classes.consent}>
      <Text>{ReactHtmlParser(data?.data?.data?.documentText)}</Text>
      <Checkbox
        label="I agree to terms and condition."
        styles={{ input: classes.checkBoxInput }}
        mt={"md"}
        onChange={(event) => setConsentSignature(event.currentTarget.checked)}
      />
    </Container>
  );
};
