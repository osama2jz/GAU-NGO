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

const Footer = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1020px)");
  return (
    <Box className={classes.footer}>
      <Title align="center" order={isMobile ? 2 : 1}>
        GET IN TOUCH
      </Title>
      <Text align="center" w={isMobile ? "90%" : "50%"}>
        There are many variations of passages of Lorem Ipsum available, but the
        majorityhave suffered alteration in some form, by injected
        humour,available
      </Text>
      <SimpleGrid
        w={"80%"}
        spacing={"100px"}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Stack>
          <Title>SAY HELLO!</Title>
          <InputField placeholder={"Name"} borderWhite={true} />
          <InputField placeholder={"Email"} borderWhite={true} />
          <TextArea placeholder={"Message"} borderWhite={true} />
          <Button label={"SUBMIT"} primary={true} />
        </Stack>
        <Stack spacing={"xl"} mx="auto">
          <Title>Contact Us</Title>
          <Flex gap={"lg"}>
            <Phone className={classes.icon} size={"50px"} />
            <Text>
              +86-432-423443
              <br />
              +86-432-423443
            </Text>
          </Flex>
          <Flex gap={"lg"}>
            <Mail className={classes.icon} size={"50px"} />
            <Text>
              mailto:gau@gmail.com
              <br /> https://gauapp.es/
            </Text>
          </Flex>
          <Flex gap={"lg"}>
            <MapPin className={classes.icon} size={"50px"} />
            <Text>
              Madrid, Spain
              <br /> Madrid, Spain
            </Text>
          </Flex>
        </Stack>
      </SimpleGrid>
      <Title order={2}>VISIT US ON</Title>
      <Flex gap={"lg"}>
        <BrandFacebook className={classes.socialIcon} />
        <BrandInstagram className={classes.socialIcon} />
        <BrandGoogle className={classes.socialIcon} />
        <BrandTwitter className={classes.socialIcon} />
        <BrandYoutube className={classes.socialIcon} />
      </Flex>
      <Text>Copyright © {new Date().getFullYear()} | GAU</Text>
    </Box>
  );
};

export default Footer;
