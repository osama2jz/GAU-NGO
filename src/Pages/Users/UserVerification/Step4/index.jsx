import { Anchor, Checkbox, Container, Group, Text } from "@mantine/core";
import axios from "axios";
import { useContext, useRef } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../../../constants/constants";
import ReactHtmlParser from "react-html-parser";
import SignatureCanvas from "react-signature-canvas";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import Loader from "../../../../Components/Loader";
import Button from "../../../../Components/Button";
import { useReactToPrint } from "react-to-print";

export const Step4 = ({ sigCanvas }) => {
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);

  const agreementSignatures = useRef();

  const printAgreement = useReactToPrint({
    content: () => agreementSignatures.current,
  });
  // const sigCanvas = useRef({});

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
    <>
     <Group position="right" mt={"md"}>
          <Button
            label={"Generate Pdf"}
            bg={true}
            onClick={()=>printAgreement()}
            // onClick={() => DownloadPdf()}
          />
        </Group>
    <Container size="xl" p={"lg"} className={classes.consent} ref={agreementSignatures}>
      <Text>{ReactHtmlParser(data?.data?.data?.documentText)}</Text>
      <Text align="center" fw={"bold"}>
        {translate("User Signature")}
      </Text>
      <Container className={classes.sign}>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="green"
          canvasProps={{ width: 900, height: 200, className: "sigCanvas" }}
        />
        <Anchor onClick={() => sigCanvas.current.clear()}>{translate("Reset")}</Anchor>
      </Container>
    </Container>
    </>
  );
};
