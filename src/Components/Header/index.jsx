import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Badge,
  Flex,
} from "@mantine/core";
import { Bell, Power, Settings, UserCircle } from "tabler-icons-react/dist";
import logo from "../../logo.svg";
import InputField from "../InputField";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    color: "white",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerSub: {
    width: "80%",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontWeight: "600",
    fontSize: "30px",
  },

  user: {
    color: "white",
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colors.gray,
      // color:'black'
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
      <Text className={classes.logo}>
        <img src={logo} alt="logo" width={"35px"} />
        GAU
      </Text>
      <Group position="apart" noWrap className={classes.headerSub}>
        <Menu
          width={"target"}
          shadow="xl"
          position="bottom-end"
          transition="pop-top-right"
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
        >
          <Container w={700}>
            <InputField
              placeholder="Search"
              leftIcon="search"
              borderWhite={true}
            />
          </Container>
          <Bell />
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={7} noWrap>
                <Avatar src={<UserCircle />} radius="xl" size={30} />
                <Flex direction={"column"} gap="4px">
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {"Muhammad Usama"}
                  </Text>
                  <Badge size="xs">Social Worker</Badge>
                </Flex>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <Flex gap={'md'}>
                <Settings />
                <Text>Settings</Text>
              </Flex>
            </Menu.Item>
            <Menu.Item color="red">
              <Flex gap={'md'}>
                <Power />
                Logout
              </Flex>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  );
};
export default Index;
