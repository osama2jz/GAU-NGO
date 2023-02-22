import { Container, Tabs } from "@mantine/core";
import ContainerHeader from "../../Components/ContainerHeader";
import { useStyles } from "./styles";
import { UpdatePassword } from "./UpdatePassword";
import { UpdateProfile } from "./UpdateProfile";

export const Setting = () => {
  const { classes } = useStyles();
  return (
    <Container className={classes.main} size="xl">
      <ContainerHeader label={"Settings"} />
      <Container className={classes.innerContainer} size="xl">
      <Tabs
        variant="pills"
        defaultValue={"profile"}
        classNames={{
          root: classes.tab,
          tabsList: classes.tabList,
          tab: classes.tabs,
        }}
      >
        <Tabs.List grow>
          <Tabs.Tab value="profile">Profile Information</Tabs.Tab>
          <Tabs.Tab value="password">Password Settings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile" pt="xs">
          <UpdateProfile />
        </Tabs.Panel>

        <Tabs.Panel value="password" pt="xs">
          <UpdatePassword />
        </Tabs.Panel>
      </Tabs>
      </Container>
     
    </Container>
  );
};

export default Setting;
