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
  MediaQuery,
} from "@mantine/core";
import { Power, Settings } from "tabler-icons-react/dist";
import logo from "../../logo.svg";
import InputField from "../InputField";
import { useMediaQuery } from "@mantine/hooks";
import Notifications from "../Notifications";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import routeNames from "../../Routes/routeNames";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    color: "white",
    padding: '0px 30px',
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
    ':hover':{
        cursor:'pointer'
    }
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

    // [theme.fn.smallerThan("xs")]: {
    //   display: "none",
    // },
  },
}));

const Index = ({setOpened}) => {
  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 640px)");
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <Container fluid className={classes.header}>
      <Text className={classes.logo} onClick={()=>navigate(routeNames.socialWorker.dashboard)}>
        <img src={logo} alt="logo" width={"35px"} />
        GAU
      </Text>
      <Group
        position="right"
        align={"center"}
        noWrap
        className={classes.headerSub}
      >
        <MediaQuery
          smallerThan="md"
          styles={{
            display: "none",
          }}
        >
          <Container
            w={500}
            smallerThan="sm"
            styles={{
              display: "none",
            }}
          >
            <InputField
              placeholder="Search"
              leftIcon="search"
              size="sm"
              pb="0px"
              borderWhite={true}
            />
          </Container>
        </MediaQuery>
        <Notifications />
        <Menu
          width={matches && "target"}
          shadow="xl"
          position="bottom-start"
          transition="pop-top-left"
          offset={20}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={7} noWrap>
                <Avatar src={user.img} radius="xl" size={30} />
                <MediaQuery
                  smallerThan="sm"
                  styles={{
                    display: "none",
                  }}
                >
                  <Flex direction={"column"} gap="4px">
                    <Text
                      weight={500}
                      size="sm"
                      sx={{
                        lineHeight: 1,
                      }}
                      mr={3}
                      noWrap
                    >
                      {user.name}
                    </Text>
                    <Badge size="xs">{user.role}</Badge>
                  </Flex>
                </MediaQuery>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => navigate(routeNames.socialWorker.settings)}
            >
              <Flex gap={"md"}>
                <Settings />
                <Text>Settings</Text>
              </Flex>
            </Menu.Item>
            <Menu.Item color="red">
              <Flex gap={"md"}>
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
