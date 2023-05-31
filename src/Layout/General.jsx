import {
  AppShell,
  Burger,
  Container,
  Group,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import { useContext, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Topbar from "../Components/Header/index";
import { LawyerSidebarData } from "../Components/Sidebar/LawyerSidebarData";
import { ngoAdminSideBarData } from "../Components/Sidebar/NgoAdminData";
import { psychSideBarData } from "../Components/Sidebar/PsychologistData";
import { SideBar } from "../Components/Sidebar/Sidebar";
import { socialSideBarData } from "../Components/Sidebar/SocialWorkerData";
import { UserSidebarData } from "../Components/Sidebar/UserSidebarData";
import { UserContext } from "../contexts/UserContext";
import routeNames from "../Routes/routeNames";
import { SuperAdminSiderbarData } from "../Components/Sidebar/SuperAdminSiderbarData";

const Layout = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();

  const allowed = () => {
    if (
      (user?.role == "Social Worker" &&
        Object.values(routeNames.socialWorker).includes(location.pathname)) ||
      (user?.role == "Admin" &&
        Object.values(routeNames.ngoAdmin).includes(location.pathname)) ||
      (user?.role == "Lawyer" &&
        Object.values(routeNames.lawyer).includes(location.pathname)) ||
      (user?.role == "Psychologist" &&
        Object.values(routeNames.pysch).includes(location.pathname)) ||
      (user?.role == "User" &&
        Object.values(routeNames.user).includes(location.pathname)) ||
      (user.role == "Super Admin" &&
        Object.values(routeNames.superAdmin).includes(location.pathname))
    ) {
      return true;
    } else {
      navigate(-1);
    }
  };

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
                : user.role === "User"
                ? UserSidebarData
                : user.role === "Super Admin"
                ? SuperAdminSiderbarData
                : []
            }
            setOpened={setOpened}
          />
        </Navbar>
      }
      footer={<></>}
      header={<></>}
    >
      <Container mih="100%" size="xl" p={"0px"}>
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
          style={{ borderRadius: "20px", border: "1px solid rgb(0,0,0,0.1)" }}
        >
          {allowed() && <Outlet />}
        </Container>
      </Container>
    </AppShell>
  ) : (
    <Navigate to={routeNames.general.landing} />
  );
};
export default Layout;
