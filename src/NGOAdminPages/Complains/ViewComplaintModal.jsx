import { Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ViewComplaintModal = ({ id, reportData }) => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  return (
    <Flex direction={"column"} align="center" justify={"space-between"}>
      <Container w={"100%"} ml="md">
        <SimpleGrid cols={2}>
          <Text className={classes.textheading}>{translate("User Name ")}</Text>
          <Text className={classes.textContent}>{reportData?.name}</Text>
          <Text className={classes.textheading}>{translate("Complaint Subject")} </Text>
          <Text className={classes.textContent}>{reportData?.amount}</Text>
          <Text className={classes.textheading}>{translate("Complaint Date")}</Text>
          <Text className={classes.textContent}>{reportData?.date}</Text>
          <Text className={classes.textheading}>{translate("NGO Name")}</Text>
          <Text className={classes.textContent}>{reportData?.ngo}</Text>
          <Text className={classes.textheading}>{translate("Description")}</Text>
          <Text className={classes.textContent}>
            {reportData?.description
              ? reportData?.description
              : translate("No Description")}
          </Text>
          <Text className={classes.textheading}>{translate("Reply")}</Text>
          <Text className={classes.textContent}>
            {reportData?.reply || translate("Not Replied")}{" "}
          </Text>
        </SimpleGrid>
      </Container>
    </Flex>
  );
};

export default ViewComplaintModal;
