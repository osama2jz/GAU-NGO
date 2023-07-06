import { Box, Flex, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { useMediaQuery } from "@mantine/hooks";
import InputField from "../InputField";
import TextArea from "../TextArea";
import Button from "../Button";
import {
  BrandFacebook,
  BrandGoogle,
  BrandInstagram,
  BrandTwitter,
  BrandYoutube,
  Mail,
  MapPin,
  Phone,
} from "tabler-icons-react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const Footer = () => {
  const { classes } = useStyles();
  const { translate } = useContext(UserContext);
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Box className={classes.footer}>
      <Title align="center" order={isMobile ? 2 : 1}>
        {translate("GET IN TOUCH")}
      </Title>
      <Text align="center" w={isMobile ? "90%" : "50%"}>
        {translate(
          "Find all the contact details of GAU NGO, including phone numbers, email addresses, and physical addresses, in the app. Whether you have a question, need assistance, or want to provide feedback, our contact information is just a tap away."
        )}
      </Text>
      <SimpleGrid
        w={"90%"}
        spacing={"100px"}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Stack>
          <Title>{translate("SAY HELLO!")}</Title>
          <InputField placeholder={"Name"} borderWhite={true} />
          <InputField placeholder={"Email"} borderWhite={true} />
          <TextArea placeholder={"Message"} borderWhite={true} />
          <Button label={"SUBMIT"} primary={true} />
        </Stack>
        <Stack spacing={"xl"} mx="auto">
          <Title>{translate("Contact Us")}</Title>
          <Flex gap={"lg"} align={"center"}>
            <Phone className={classes.icon} size={"50px"} />
            <Text>
              +34641854490
            </Text>
          </Flex>
          <Flex gap={"lg"}>
            <Mail className={classes.icon} size={"50px"} />
            <Text>
              info@gauapp.es
              <br /> https://gauapp.es/
            </Text>
          </Flex>
          <Flex gap={"lg"} align={"center"}>
            <MapPin className={classes.icon} size={"50px"} />
            <Text>
              Madrid, Spain
            </Text>
          </Flex>
        </Stack>
      </SimpleGrid>
      <Title order={2}>{translate("VISIT US ON")}</Title>
      <Flex gap={"lg"}>
        {/* <BrandFacebook className={classes.socialIcon} /> */}
        <BrandInstagram className={classes.socialIcon} />
        {/* <BrandGoogle className={classes.socialIcon} /> */}
        <BrandTwitter className={classes.socialIcon} />
        {/* <BrandYoutube className={classes.socialIcon} /> */}
      </Flex>
      <Text>Copyright © {new Date().getFullYear()} | GAU</Text>
    </Box>
  );
};

export default Footer;
