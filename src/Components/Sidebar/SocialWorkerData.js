import {
  CalendarEvent,
  CalendarTime,
  Gauge,
  Power,
  Report,
  Settings,
  UserPlus,
  Users,
} from "tabler-icons-react";
import routeNames from "../../Routes/routeNames";
export const socialSideBarData = [
  { label: "Dashboard", icon: Gauge, link: routeNames.socialWorker.dashboard },
  {
    label: "My Schedules",
    icon: CalendarTime,
    links: [
      { label: "Appointment Schedule", link: "/" },
      { label: "View All", link: "/" },
      { label: "Start a Session", link: "/" },
      { label: "Refer to Export", link: "/" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    links: [
      {
        label: "Add Users",
        icon: UserPlus,
        link: routeNames.socialWorker.addUser,
      },
      { label: "All Users", link: routeNames.socialWorker.allUsers },
      {
        label: "Verification Schedule",
        link: routeNames.socialWorker.allUsers,
      },
    ],
  },
  // {
  //   label: "User Verification",
  //   icon: TruckDelivery,
  //   links: [
  //     { label: "Schedule Users", link: routeNames.socialWorker.scheduleUser },
  //     { label: "Verify User", link: routeNames.socialWorker.verifyUser },
  //     { label: "Verified Users", link: routeNames.socialWorker.verifiedUsers },
  //   ],
  // },
  {
    label: "Appointments",
    icon: CalendarEvent,
    links: [
      {
        label: "Appointment Schedule",
        link: routeNames.socialWorker.scheduledAppointments,
      },
      { label: "Add Appointment", link: "/" },
      {
        label: "All Appointments",
        link: routeNames.socialWorker.allAppointments,
      },
      // { label: "Refer to Export", link: "/refer" },
    ],
  },
  {
    label: "Reports",
    icon: Report,
    links: [
      { label: "Private", link: "/" },
      { label: "Public", link: "/" },
    ],
  },
];

export const bottom = [
  { label: "Settings", icon: Settings, link: routeNames.socialWorker.settings },
  {
    label: "Log Out",
    link: "/",
    icon: Power,
  },
];
