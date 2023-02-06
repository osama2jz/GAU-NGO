import React from "react";
import { SideBar } from "../../GeneralComponents/Sidebar/Sidebar";
import { AdminSidebarLinks } from "./SocialWorkerData";

const AdminSideBar = () => {
  return <SideBar sideBarLinks={AdminSidebarLinks} />;
};

export default AdminSideBar;
