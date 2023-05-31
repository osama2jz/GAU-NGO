import {
  CalendarEvent,
  CalendarTime,
  LayoutDashboard,
  Power,
  Report,
  Settings,
  UserPlus,
  Users,
  Building,
  FileText,
  Clock,
  CurrencyDollar,
  FileBarcode,
  Language,
  ClipboardTypography,
  BuildingBank,
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
    ]
  },




  { label: "Settings", icon: Settings, link: routeNames.superAdmin.settings },
];

//not using for now
export const bottom = [
  { label: "Settings", icon: Settings, link: routeNames.socialWorker.settings },
  {
    label: "Log Out",
    link: routeNames.general.login,
    icon: Power,
  },
];
