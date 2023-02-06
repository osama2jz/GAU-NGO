import {
  AppShell,
  Navbar,
  Header,
  Burger,
  MediaQuery,
  Text,
  useMantineTheme,
  Group,
} from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../Components/Sidebar/Sidebar";
import Topbar from "../Components/Header/index";
import { socialSideBarData } from "../Components/Sidebar/SocialWorkerData";

const Layout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: "white",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300, lg: 300 }}
          bg={""}
        >
          <SideBar sideBarLinks={socialSideBarData} />
        </Navbar>
      }
      footer={<></>}
      header={
        <Header height={{ base: 70, md: 70 }} p="md" bg={theme.colors.primary}>
          <Group noWrap>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Topbar />
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};
export default Layout;
