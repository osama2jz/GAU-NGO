import React from "react";
import { Text } from "@mantine/core";
const ContainerHeader = ({ label }) => {
 return (
  <Text fz={32} fw={600} align="center">
   {label}
  </Text>
 );
};
export default ContainerHeader;
