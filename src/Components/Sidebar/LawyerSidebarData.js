import {
  CalendarEvent,
  CalendarTime,
  LayoutDashboard,
  Power,
  Report,
  Settings,
  Users,
} from "tabler-icons-react";
import routeNames from "../../Routes/routeNames";
export const LawyerSidebarData = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: routeNames.lawyer.dashboard,
  },
  {
    label: "User",
    icon: Users,
    links: [
      { label: "View Users", link: routeNames.lawyer.allUsers },
    ],
  },
  {
    label: "Appointment",
    icon: CalendarEvent,
    links: [
      {
        label: "Appointment Schedule",
        link: routeNames.lawyer.scheduledAppointments,
      },
      { label: "Add Appointment", link: routeNames.lawyer.addAppoinment },
      {
        label: "View Appointments",
        link: routeNames.lawyer.allAppointments,
      },
    ],
  },
  {
    label: "My Schedule",
    icon: CalendarTime,
    links: [{ label: "My Schedule", link: routeNames.lawyer.mySchedule }],
  },
  {
    label: "Report",
    icon: Report,
    links: [
      { label: "Private", link: routeNames.lawyer.privateReport },
      { label: "Public", link: routeNames.lawyer.publicReport },
      { label: "Case Reports", link: routeNames.socialWorker.referalReport },
    ],
  },
];

export const bottom = [
  { label: "Settings", icon: Settings, link: routeNames.lawyer.settings },
  {
    label: "Log Out",
    link: "/",
    icon: Power,
  },
];
