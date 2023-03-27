import React from "react";
import { Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const ContainerHeader = ({ label }) => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  return (
    <Text size={isMobile ? 30 : 40} weight={700} align="center">
      {label}
    </Text>
  );
};
export default ContainerHeader;
