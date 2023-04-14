import React, { useContext, useMemo } from "react";
import { Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { UserContext } from "../../contexts/UserContext";
const ContainerHeader = ({ label, ...props }) => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const { translate } = useContext(UserContext);

  const translation = useMemo(() => {
    if (label.split(" ").length === 1) {
      return translate(label);
    } else {
      let other = "";
      label.split(" ").forEach((i) => {
        let a = translate(i);
        other = other + " " + a;
      });
      return other;
    }
  }, [label, translate]);

  return (
    <Text size={isMobile ? 30 : 40} weight={700} align="center" {...props} mt={"lg"}>
      {translation}
    </Text>
  );
};
export default ContainerHeader;
