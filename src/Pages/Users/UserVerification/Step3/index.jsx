import { Anchor, Container, Text } from "@mantine/core";
import axios from "axios";
import { useContext, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { useQuery } from "react-query";
import SignatureCanvas from "react-signature-canvas";
import Loader from "../../../../Components/Loader";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";

export const Step3 = ({ sigCanvas }) => {
  const { classes } = useStyles();
  // const sigCanvas = useRef({});
  const { user, translate } = useContext(UserContext);

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
      <Text align="center" fw={"bold"}>
        {translate("User Signature")}
      </Text>
      <Container className={classes.sign}>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="green"
          canvasProps={{ width:900,height: 200, className: "sigCanvas" }}
        />
        <Anchor onClick={() => sigCanvas.current.clear()}>{translate("Reset")}</Anchor>
      </Container>
    </Container>
  );
};
