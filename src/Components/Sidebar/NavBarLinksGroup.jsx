import {
  Box,
  Collapse,
  createStyles,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor: "rgba(86, 92, 154, 1)",
    },
  },

  link: {
    // fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: "white",
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor: "rgba(86, 92, 154, 1)",
    },
  },

  chevron: {
    color: "white",
    transition: "transform 200ms ease",
  },
}));

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  ind,
  link,
  globalOpen,
  setGlobalOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const { classes, theme } = useStyles();
  const ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;
  useEffect(() => {
    globalOpen !== label && setOpened(false);
  }, [globalOpen, label]);
  const items = (hasLinks ? links : []).map((link, index) => (
    <Text
      component={Link}
      className={classes.link}
      to={link.link}
      key={link.label}
      bg={
        location.pathname === link.link && link.label === globalOpen
          ? "rgba(86, 92, 154, 1)"
          : ""
      }
    >
      {ind + "." + (index + 1) + " " + link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          setOpened((o) => !o);
          setGlobalOpen(label);
        }}
        className={classes.control}
        bg={
          location.pathname === link && label === globalOpen
            ? "rgba(86, 92, 154, 1)"
            : ""
        }
      >
        <Group position="apart" spacing={0} onClick={() => navigate(link)}>
          <Box
            sx={{ display: "flex", alignItems: "center", color: "white" }}
            fw={"normal"}
          >
            <Icon size={18} />
            <Box ml="md">{ind ? ind + ". " + label : label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={12}
              // stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
