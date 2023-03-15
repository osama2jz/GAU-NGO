import {
  Box,
  Burger,
  createStyles,
  Flex,
  Group,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import logo from "../../logo.svg";
import routeNames from "../../Routes/routeNames";
import { LinksGroup } from "./NavBarLinksGroup";
import { bottom } from "./SocialWorkerData";

const useStyles = createStyles((theme, { role }) => ({
  navbar: {
    backgroundColor: theme.colors.white,
    boxShadow: "5px 10px 10px rgb(0,0,0,0.1)",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colors.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: theme.colors.white,
    // backgroundColor:
    //   role === "Social Worker" ? "pink" : role === "Admin" ? "white" : "teal",
    margin: "5px",
    borderRadius: "10px",
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    maxHeight: "75vh",
   
  },
  logo: {
    display: "flex",
    alignItems: "center",
    color: "black",
    gap: "5px",
    marginTop: "20px",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "30px",
    ":hover": {
      cursor: "pointer",
    },
  },
  footer: {
    backgroundColor: "white",
    // backgroundColor:
    //   role === "Social Worker" ? "pink" : role === "Admin" ? "white" : "teal",
    borderTop: "1px solid rgb(0,0,0,0.05)",
    bottom: "10px",
    width: "100%",
    position: "absolute",
  },
}));

export function SideBar({ sideBarLinks, setOpened, opened }) {
  const { user } = useContext(UserContext);
  let role = user.role;
  const { classes } = useStyles({ role });
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [globalOpen, setGlobalOpen] = useState("");
  const links = sideBarLinks.map((item, ind) => (
    <LinksGroup
      {...item}
      key={ind}
      ind={ind + 1}
      link={item.link}
      globalOpen={globalOpen}
      setGlobalOpen={setGlobalOpen}
      setSideOpen={setOpened}
    />
  ));
  const bottoms = bottom.map((item, ind) => (
    <LinksGroup
      {...item}
      key={ind}
      setSideOpen={setOpened}
      setGlobalOpen={setGlobalOpen}
      globalOpen={globalOpen}
    />
  ));

  return (
    <Navbar width={{ sm: 320 }} className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <Group position="center" w={"60%"} align="center">
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.black}
              style={{ marginRight: "auto" }}
            />
          </MediaQuery>
          <Text
            className={classes.logo}
            onClick={() => navigate(routeNames.socialWorker.dashboard)}
          >
            <img src={logo} alt="logo" width={"35px"} />
            GAU
          </Text>
        </Group>
        <div className={classes.linksInner}>{links}</div>
        <Flex direction={"column"} className={classes.footer}>
          {bottoms}
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
}
