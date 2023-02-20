import React, { useState } from "react";
import {
  SimpleGrid,
  Container,
  Flex,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useStyles } from "../styles";
import DoubleTabs from "./Tabs";
const Step3 = ({ selectedUser, caseNo,reportFiles,setReportFiles ,setPrivateReportFiles,privatereportFiles}) => {
  return (
    <Container size="lg">
      <Flex justify={"space-between"}>
        <SimpleGrid cols={2}>
          <Text fz={18} fw={"bold"}>
            Case#
          </Text>
          <Text>{caseNo}</Text>
        </SimpleGrid>
        <Flex align={"center"}>
          <Text fz={18} fw={"bold"}>
            Date:
          </Text>
          <Text ml={10}>XXXX</Text>
        </Flex>
      </Flex>   
      <DoubleTabs selectedUser={selectedUser} setReportFiles={setReportFiles} privatereportFiles={privatereportFiles} reportFiles={reportFiles} setPrivateReportFiles={setPrivateReportFiles}/>
    </Container>
  );
};

export default Step3;
