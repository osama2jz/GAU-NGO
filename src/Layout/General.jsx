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
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import { SideBar } from "../Components/Sidebar/Sidebar";
import Topbar from "../Components/Header/index";
import { socialSideBarData } from "../Components/Sidebar/SocialWorkerData";
import { UserContext } from "../contexts/UserContext";
import { psychSideBarData } from "../Components/Sidebar/PsychologistData";
import routeNames from "../Routes/routeNames";
import { LawyerSidebarData } from "../Components/Sidebar/LawyerSidebarData";
import { ngoAdminSideBarData } from "../Components/Sidebar/NgoAdminData";

const Layout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user } = useContext(UserContext);

  return user?.role && user?.token ? (
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
            opened={opened}
            sideBarLinks={
              user.role === "Social Worker"
                ? socialSideBarData
                : user.role === "Psychologist"
                ? psychSideBarData
                : user.role === "Lawyer"
                ? LawyerSidebarData
                : user.role === "Admin"
                ? ngoAdminSideBarData
                : []
            }
            setOpened={setOpened}
          />
        </Navbar>
      }
      footer={<></>}
      header={
        <></>
        //   <Header height={{ base: 60, md: 60, sm: 65 }} bg={theme.colors.primary}>
        //     <Group noWrap>
        // <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        //   <Burger
        //     opened={opened}
        //     onClick={() => setOpened((o) => !o)}
        //     size="sm"
        //     color={theme.colors.gray}
        //     mr="xl"
        //   />
        // </MediaQuery>
        //       <Topbar />
        //     </Group>
        //   </Header>
      }
    >
      <Container mih="100%" size="xl">
        <Group noWrap>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.black}
            />
          </MediaQuery>
          <Topbar />
        </Group>
        <Container
          bg={theme.colors.container}
          size="xl"
          style={{ borderRadius: "20px", border: "1px solid rgb(0,0,0,0.034 " }}
        >
          <Outlet />
        </Container>
      </Container>
    </AppShell>
  ) : (
    <Navigate to={routeNames.general.login} />
  );
};
export default Layout;
