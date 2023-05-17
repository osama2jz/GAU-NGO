import { Anchor, Container, Flex, Group, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useContext, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { useQuery } from "react-query";
import SignatureCanvas from "react-signature-canvas";
import Loader from "../../../../Components/Loader";
import { backendUrl } from "../../../../constants/constants";
import { UserContext } from "../../../../contexts/UserContext";
import { useStyles } from "../styles";
import Button from "../../../../Components/Button";
import { useReactToPrint } from "react-to-print";
import Logo from "../../../../logo.svg";
import moment from "moment";

export const Step3 = ({ sigCanvas }) => {
  const { classes } = useStyles();
  // const sigCanvas = useRef({});
  const { user, translate } = useContext(UserContext);
  const consentSignatures = useRef();
  var currentTime = moment();

  const printConsent = useReactToPrint({
    content: () => consentSignatures.current,
  });

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
    <>
      <Group position="right" mt={"md"}>
        <Button
          label={"Generate Pdf"}
          bg={true}
          onClick={() => printConsent()}
          // onClick={() => DownloadPdf()}
        />
      </Group>
      <Container
        size="xl"
        p={"lg"}
        className={classes.consent}
        ref={consentSignatures}
      >
        <Group position="center" mt={"md"}>
          {/* <Flex align={"center"}> */}
          <img src={Logo} width={"100px"} />
          <Text fw={"bold"} fz={"30px"}>
            GAU
          </Text>
          {/* </Flex> */}
        </Group>
        {/* <Flex align={"center"}>
          <img src={Logo} width={"70px"} />
          <Text fw={"bold"} fz={"lg"}>
            GAU
          </Text>
        </Flex> */}
        <Flex justify={"space-between"}>
          <Flex align={"center"}>
            <Text align="center" fw={"bold"}>
              {translate("Date")} {":"}
            </Text>
            <Text align="center" fw={"bold"}>
              {" "}
              {moment(new Date()).format("DD-MM-YYYY")}
            </Text>
          </Flex>
          <Flex align={"center"}>
            <Text align="center" fw={"bold"}>
              {translate("Time")} {": "}
            </Text>
            <Text align="center" fw={"bold"}>
              {moment(currentTime).format("hh:mm")}
            </Text>
          </Flex>
        </Flex>
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
          <Anchor onClick={() => sigCanvas.current.clear()}>
            {translate("Reset")}
          </Anchor>
        </Container>
      </Container>
    </>
  );
};
