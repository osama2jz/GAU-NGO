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
import routeNames from "../../Routes/routeNames";

const useStyles = createStyles((theme) => ({
  mainLink: {
    fontWeight: 600,
    display: "block",
    width: "100%",
    margin:'1px 0px',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderBottom:'1px solid rgb(0,0,0,0.2)',
    fontSize: theme.fontSizes.lg,
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: theme.colors.blueSide,
    },
  },

  link: {
    fontWeight: 500,
    margin:'1px',
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    borderRadius: "5px",

    "&:hover": {
      backgroundColor: theme.colors.blueSide,
    },
  },

  chevron: {
    color: "rgb(0,0,0,0.6)",
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
  setSideOpen,
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
      onClick={() => setSideOpen(false)}
      key={link.label}
      color={
        location?.pathname === link.link && label === globalOpen
          ? theme.colors.blue
          : "rgb(0,0,0,0.9)"
      }
      sx={{
        borderRight:
          location?.pathname === link.link &&
          label === globalOpen &&
          `10px solid ${theme.colors.blue[9]}`,
      }}
      bg={
        location?.pathname === link.link && label === globalOpen
          ? theme.colors.blueSide
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
          link && setSideOpen(false);
          navigate(link);
          if (label === "Log Out") {
            localStorage.removeItem("userData");
          }
        }}
        className={classes.mainLink}
        sx={{
          borderRight:
            location?.pathname === link &&
            label === globalOpen &&
            `10px solid ${theme.colors.blue[9]}`,
        }}
        bg={
          location?.pathname === link && label === globalOpen
            ? theme.colors.blueSide
            : ""
        }
      >
        <Group position="apart" spacing={0} onClick={() => navigate(link)}>
          <Text
            color={
              location?.pathname === link && label === globalOpen
                ? theme.colors.blue
                : "rgb(0,0,0,0.9)"
            }
            sx={{ display: "flex", alignItems: "center" }}
            fw={"500"}
          >
            <Icon size={18} />
            <Box ml="md">{ind ? ind + ". " + label : label}</Box>
          </Text>
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
