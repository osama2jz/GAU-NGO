import {
  Grid,
  Avatar,
  SimpleGrid,
  Container,
  Text,
  Badge,
  Flex,
} from "@mantine/core";
import { useStyles } from "./styles";

import userlogo from "../../assets/compliance.png";
import { useQuery } from "react-query";

function ViewUserModal({ id, reportData }) {
  const { classes } = useStyles();

  return (
    <>
      <Flex direction={"column"} align="center" justify={"space-between"}>
       
          {/* <Avatar
            radius="sm"
            size={130}
            src={userlogo}
            className={classes.avatar}
          />
      */}
        
          <Text size={24} weight="bold" mb="sm" align="center">
            {reportData?.name}
          </Text>
          <Container w={"100%"} ml="md">
            <SimpleGrid cols={2}>
              <Text className={classes.textheading}>Complaint Subject </Text>
              <Text className={classes.textContent}>{reportData?.amount}</Text>
              <Text className={classes.textheading}>Complaint Date</Text>
              <Text className={classes.textContent}>{reportData?.date}</Text>
              
              <Text className={classes.textheading}>NGO Name</Text>
              <Text className={classes.textContent}>{reportData?.ngo}</Text>
            </SimpleGrid>
          </Container>
        
      </Flex>
      <Text  mt="md" className={classes.textheading}>Description</Text>
              <Text className={classes.textContent}>
                {reportData?.description
                  ? reportData?.description
                  : "No Description"}
              </Text>
    </>
  );
}

export default ViewUserModal;
