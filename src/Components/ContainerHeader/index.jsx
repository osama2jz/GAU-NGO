import React, { useContext, useMemo } from "react";
import { Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { UserContext } from "../../contexts/UserContext";
const ContainerHeader = ({ label, ...props }) => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const { translate } = useContext(UserContext);

  return (
    <Text
      size={isMobile ? 30 : 40}
      weight={700}
      align="center"
      {...props}
      mt={"lg"}
    >
      {translate(label)}
    </Text>
  );
};
export default ContainerHeader;
