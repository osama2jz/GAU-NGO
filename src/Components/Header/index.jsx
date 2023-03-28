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
import InputField from "../InputField";
import { useMediaQuery } from "@mantine/hooks";
import Notifications from "../Notifications";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import routeNames from "../../Routes/routeNames";
import { useNavigate } from "react-router";
import userImage from "../../assets/teacher.png";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    color: "black",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: theme.colors.white,
    // borderBottom: "1px solid red",
  },
  headerSub: {
    width: "100%",
  },

  user: {
    color: "black",
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      // backgroundColor: theme.colors.gray,
      // color:'black'
    },

    // [theme.fn.smallerThan("xs")]: {
    //   display: "none",
    // },
  },
}));

const Index = ({}) => {
  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 640px)");
  const matches2 = useMediaQuery("(min-width: 1100px)");
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <Container fluid className={classes.header} p="0px" pb={"5px"}>
      <Group
        position="left"
        noWrap
        className={classes.headerSub}
      >
        <Flex direction={"column"} style={{ margin: matches2&&"auto" }} align="center">
          <Text fw={"bolder"} fz={matches2 && "xl"}>
            {user.role} Dashboard
          </Text>
          <Text fz="xs" >
            Welcome Back <b>{user.name}</b>
          </Text>
        </Flex>
        <div style={{ position: "absolute", right: "20px" }}>
          {/* <Notifications /> */}
          <Menu
            width={matches && "target"}
            withArrow
            shadow="xl"
            position="bottom-end"
            transition="pop-top-left"
            offset={5}
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
                  <MediaQuery
                    query="(max-width: 650px)"
                    styles={{
                      display: "none",
                    }}
                  >
                    <Flex direction={"column"} gap="4px" mr={"md"}>
                      <Text
                        weight={500}
                        size="lg"
                        sx={{
                          lineHeight: 1,
                        }}
                        mr={3}
                      >
                        {user.name}
                      </Text>
                      <Text size="xs" color={"rgb(0,0,0,0.5)"}>
                        {user.email}
                      </Text>
                    </Flex>
                  </MediaQuery>
                  <Avatar
                    src={user?.profileImage || userImage}
                    radius="xl"
                    size={50}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => navigate(routeNames.socialWorker.settings)}
              >
                <Flex gap={"md"} align="center">
                  <Settings />
                  <Text>Settings</Text>
                </Flex>
              </Menu.Item>
              <Menu.Item
                color="red"
                onClick={() => {
                  localStorage.removeItem("userData");
                  navigate(routeNames.general.login);
                }}
              >
                <Flex gap={"md"} align="center">
                  <Power />
                  Logout
                </Flex>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Group>
    </Container>
  );
};
export default Index;
