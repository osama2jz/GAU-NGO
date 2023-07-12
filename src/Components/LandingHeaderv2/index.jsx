import { Box, Burger, Container, Flex, Switch, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Gau.png";
import { UserContext } from "../../contexts/UserContext";
import Button from "../Button";
import { useStyles } from "./styles";
import { World } from "tabler-icons-react";

const Header = ({ opened, toggle, onClick }) => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const isMobile2 = useMediaQuery("(max-width: 800px)");

  const { user, translate } = useContext(UserContext);
  const { classes } = useStyles({ opened });

  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        top: 0,
        left: 0,
        justifyContent: "space-around",
        alignItems: "center",
        position: "sticky",
        paddingBlock: isMobile ? "10px" : "20px",
        zIndex: "11",
        background:
          "linear-gradient(to right, rgb(4, 143, 200) , rgb(101, 230, 223))",
        // backgroundColor: "rgb(4, 143, 200)",
      }}
    >
      <Flex
        align={"center"}
        className={classes.logo}
        onClick={() => onClick("home")}
      >
        <img src={logo} width={60} />
        <Text fw={"bold"} fz={20}>
          GAU
        </Text>
      </Flex>
      <Flex gap={"lg"} align={"center"} className={classes.navigationBar}>
        {/* <Text className={classes.link} onClick={() => onClick("home")}>
          {translate("Home")}
        </Text> */}
        <Link className={classes.link} onClick={() => onClick("about")}>
          {translate("About Us")}
        </Link>
        <Link className={classes.link} onClick={() => onClick("services")}>
          {translate("Services")}
        </Link>
        <Link className={classes.link} onClick={() => onClick("download")}>
          {translate("Download")}
        </Link>
        {/* <Link className={classes.link} onClick={() => onClick("reviews")}>
          {translate("Reviews")}
        </Link> */}
        <Link className={classes.link} onClick={() => onClick("donate")}>
          {translate("Donations")}
        </Link>
        <Link className={classes.link} onClick={() => onClick("ss")}>
          {translate("Screenshots")}
        </Link>
        <Link className={classes.link} onClick={() => onClick("footer")}>
          {translate("Contact Us")}
        </Link>
        <Switch
          onLabel={<Text style={{ color: "gray" }}>SP</Text>}
          offLabel={"EN"}
          color="white"
          size="lg"
          styles={{ track: { cursor: "pointer" } }}
          checked={user?.lang === "spanish" ? true : false}
          thumbIcon={<World size={"sm"} color="green" />}
          onChange={() => {
            localStorage.setItem(
              "lang",
              user?.lang === "spanish" ? "english" : "spanish"
            );
            window.location.reload();
          }}
        />
      </Flex>
      {/* {!user?.role ? (
        <Flex gap="md">
          <Button
            label={"Sign up"}
            size={isMobile ? "xs" : "sm"}
            primary={true}
            onClick={() =>
              (window.location.href = "https://gauapp.es/auth/signup")
            }
          />
          <Button
            size={isMobile ? "xs" : "sm"}
            label={"Log in"}
            primary={true}
            onClick={() =>
              (window.location.href = "https://gauapp.es/auth/login")
            }
          />
        </Flex>
      ) : (
        <Button
          onClick={() => {
            localStorage.removeItem("userData");
          }}
          label={"Logout"}
        />
      )} */}
      {isMobile && <Burger opened={opened} onClick={toggle} color="white" />}
    </Box>
  );
};
export default Header;
