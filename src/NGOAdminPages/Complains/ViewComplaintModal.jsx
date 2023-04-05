import { Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { useStyles } from "./styles";

const ViewComplaintModal = ({ id, reportData }) => {
  const { classes } = useStyles();

  return (
    <Flex direction={"column"} align="center" justify={"space-between"}>
      <Container w={"100%"} ml="md">
        <SimpleGrid cols={2}>
          <Text className={classes.textheading}>User Name </Text>
          <Text className={classes.textContent}>{reportData?.name}</Text>
          <Text className={classes.textheading}>Complaint Subject </Text>
          <Text className={classes.textContent}>{reportData?.amount}</Text>
          <Text className={classes.textheading}>Complaint Date</Text>
          <Text className={classes.textContent}>{reportData?.date}</Text>

          <Text className={classes.textheading}>NGO Name</Text>
          <Text className={classes.textContent}>{reportData?.ngo}</Text>
          <Text className={classes.textheading}>Description</Text>
          <Text className={classes.textContent}>
            {reportData?.description
              ? reportData?.description
              : "No Description"}
          </Text>
          <Text className={classes.textheading}>Reply</Text>
          <Text className={classes.textContent}>
            {reportData?.reply || "Not Replied"}{" "}
          </Text>
        </SimpleGrid>
      </Container>
    </Flex>
  );
};

export default ViewComplaintModal;
