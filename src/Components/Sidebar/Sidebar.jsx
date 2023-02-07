import {
  Box,
  createStyles,
  Flex,
  Group,
  Navbar,
  ScrollArea,
} from "@mantine/core";
import { Logout, Settings } from "tabler-icons-react";

import { LinksGroup } from "./NavBarLinksGroup";
import { bottom } from "./SocialWorkerData";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: "white",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    backgroundColor: theme.colors.primary,
    margin: "15px",
    borderRadius: "10px",
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    bottom: "10px",
    width:'100%',
    position: "absolute",
  },
}));

export function SideBar({ sideBarLinks }) {
  const { classes } = useStyles();
  const links = sideBarLinks.map((item, ind) => (
    <LinksGroup {...item} key={ind} ind={ind + 1} link={item.link} />
  ));
  const bottoms = bottom.map((item, ind) => (
    <LinksGroup {...item} key={ind} />
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
        <Flex direction={"column"} className={classes.footer}>
          {bottoms}
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
}
