import {
  BuildingBank,
  LayoutDashboard,
  Power,
  Settings,
} from "tabler-icons-react";
import routeNames from "../../Routes/routeNames";

export const SuperAdminSiderbarData = [
  {
    label: "DashBoard",
    icon: LayoutDashboard,
    link: routeNames.superAdmin.dashboard,
  },
  {
    label: "NGO",
    icon: BuildingBank,
    links: [
      {
        label: "Add NGO",
        link: routeNames.superAdmin.addNgo,
      },
      {
        label: "View NGO",
        link: routeNames.superAdmin.allNgo,
      },
    ],
  },

  { label: "Settings", icon: Settings, link: routeNames.superAdmin.settings },
];
