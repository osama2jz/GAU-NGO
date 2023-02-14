import {
  AppShell,
  Navbar,
  Header,
  Burger,
  MediaQuery,
  Text,
  useMantineTheme,
  Group,
  Container,
} from "@mantine/core";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../Components/Sidebar/Sidebar";
import Topbar from "../Components/Header/index";
import { socialSideBarData } from "../Components/Sidebar/SocialWorkerData";
import { UserContext } from "../contexts/UserContext";
import { psychSideBarData } from "../Components/Sidebar/PsychologistData";

const Layout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.background,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 320, lg: 320 }}
          bg={""}
        >
          <SideBar
            sideBarLinks={
              user.role === "Social Worker"
                ? socialSideBarData
                : user.role === "Psychologist"
                ? psychSideBarData
                : []
            }
            setOpened={setOpened}
          />
        </Navbar>
      }
      footer={<></>}
      header={
        <Header height={{ base: 55, md: 60, sm: 80 }} bg={theme.colors.primary}>
          <Group noWrap>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray}
                mr="xl"
              />
            </MediaQuery>
            <Topbar />
          </Group>
        </Header>
      }
    >
      <Container mt={"md"} mih="100%" size="lg">
        <Outlet />
      </Container>
    </AppShell>
  );
};
export default Layout;
