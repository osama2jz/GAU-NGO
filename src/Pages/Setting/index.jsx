import { Container, Tabs } from "@mantine/core";
import { useContext } from "react";
import ContainerHeader from "../../Components/ContainerHeader";
import { UserContext } from "../../contexts/UserContext";
import MyDocs from "./MyDocs";
import { useStyles } from "./styles";
import { UpdatePassword } from "./UpdatePassword";
import { UpdateProfile } from "./UpdateProfile";

export const Setting = () => {
  const { classes } = useStyles();
  const { user, translate } = useContext(UserContext);
  return (
    <Container className={classes.main} size="xl" p={"0px"}>
      <ContainerHeader label={"Settings"} />
      <Container className={classes.innerContainer} size="xl">
        <Tabs
          variant="pills"
          defaultValue={"profile"}
          color={"blue.0"}
          classNames={{
            root: classes.tab,
            tabsList: classes.tabList,
            tab: classes.tabs,
          }}
        >
          <Tabs.List grow>
            <Tabs.Tab value="profile">{translate("Profile Information")}</Tabs.Tab>
            {user.role === "User" && (
              <Tabs.Tab value="docs">{translate("My Documents")}</Tabs.Tab>
            )}
            <Tabs.Tab value="password">{translate("Password Settings")}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="profile" pt="xs">
            <UpdateProfile />
          </Tabs.Panel>
          <Tabs.Panel value="password" pt="xs">
            <UpdatePassword />
          </Tabs.Panel>
          <Tabs.Panel value="docs" pt="xs">
            <MyDocs />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Container>
  );
};

export default Setting;
