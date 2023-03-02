import { Checkbox, Container, Text } from "@mantine/core";
import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../../../constants/constants";
import ReactHtmlParser from "react-html-parser";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";

export const Step4 = ({ setAgreementSignature }) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);

  //API call for fetching agreement form
  const { data, status } = useQuery("fetchConsent", () => {
    return axios.get(
      `${
        backendUrl + `/api/lookup/listDocumentByType/63fd998555c36b0014b3859b`
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
        onChange={(event) => setAgreementSignature(event.currentTarget.checked)}
      />
    </Container>
  );
};
