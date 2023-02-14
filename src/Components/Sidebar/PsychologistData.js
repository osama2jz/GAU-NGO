import {
  CalendarEvent,
  CalendarTime,
  LayoutDashboard,
  Power,
  Report,
  Settings,
} from "tabler-icons-react";
import routeNames from "../../Routes/routeNames";
export const psychSideBarData = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: routeNames.pysch.dashboard,
  },
  {
    label: "Appointment",
    icon: CalendarEvent,
    links: [
      {
        label: "Appointment Schedule",
        link: routeNames.pysch.scheduledAppointments,
      },
      { label: "Add Appointment", link: routeNames.pysch.addAppoinment },
      {
        label: "View Appointments",
        link: routeNames.pysch.allAppointments,
      },
    ],
  },
  {
    label: "My Schedule",
    icon: CalendarTime,
    links: [{ label: "My Schedule", link: routeNames.pysch.mySchedule }],
  },
  {
    label: "Report",
    icon: Report,
    links: [
      { label: "Private", link: routeNames.pysch.privateReport },
      { label: "Public", link: routeNames.pysch.publicReport },
      { label: "Referral", link: routeNames.pysch.referalReport },
    ],
  },
];

export const bottom = [
  { label: "Settings", icon: Settings, link: routeNames.pysch.settings },
  {
    label: "Log Out",
    link: "/",
    icon: Power,
  },
];
