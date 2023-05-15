import axios from 'axios';
import React from 'react'
import { backendUrl } from '../../../constants/constants';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useQuery } from 'react-query';
import { Container, Text } from '@mantine/core';
import { useStyles } from "./styles";
import ReactHtmlParser from "react-html-parser";
import SignatureCanvas from "react-signature-canvas";

function ConsentForm({Data,consentSignatures}) {
    const { classes } = useStyles();
    const {user,translate}=useContext(UserContext)
    console.log(Data?.userConsentForm?.consentSignatures)
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
  return (
    <Container size="xl" p={"lg"}  className={classes.innerContainer} ref={consentSignatures} >
      <Text>{ReactHtmlParser(data?.data?.data?.documentText)}</Text>
      <Text align="center" fw={"bold"}>
        {translate("User Signature")}
      </Text>
      <Container className={classes.sign}>
        <img src={Data?.userConsentForm?.consentSignatures} alt="signature" />
      
      </Container>
    </Container>
  )
}

export default ConsentForm