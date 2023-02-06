import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
} from "@mantine/core";
import { UserCircle } from "tabler-icons-react/dist";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    color: "white",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "red",
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

const Index = ({}) => {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Container fluid className={classes.header}>
      <Text>GOU</Text>
      <Group position="apart" noWrap>
        <Menu
          width={260}
          position="bottom-end"
          transition="pop-top-right"
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={7}>
                <Avatar src={UserCircle} radius="xl" size={20} />
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {"John"}
                </Text>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item>Pause subscription</Menu.Item>
            <Menu.Item color="red">Delete account</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  );
};
export default Index;
