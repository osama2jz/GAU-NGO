import React, { useState } from "react";
import { SimpleGrid, Container, Flex, Text, useMantineTheme } from "@mantine/core";
import { useStyles } from "../styles";
import DoubleTabs from "./Tabs";
const Step3 = ({selectedUser}) => {
 return (
  <Container size="lg">
   <Text fz={20} fw="bolder" align="center" mb={"md"}>
    Upload Report
   </Text>
   <Flex justify={"space-between"}>
    <SimpleGrid cols={2}>
     <Text fz={18} fw={"bold"}>
      Case#
     </Text>
     <Text>XXXX</Text>
    </SimpleGrid>
    <Flex align={"center"}>
     <Text fz={18} fw={"bold"}>
      Date:
     </Text>
     <Text ml={10}>XXXX</Text>
    </Flex>
   </Flex>
   {/* ///// */}
   <DoubleTabs selectedUser={selectedUser}/>
  </Container>
 );
};

export default Step3;
