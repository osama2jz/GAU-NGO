import {
  Gauge,
  Logout,
  Power,
  Settings,
  TruckDelivery,
  UserPlus,
} from "tabler-icons-react";
import routeNames from "../../Routes/routeNames";
export const socialSideBarData = [
  { label: "Dashboard", icon: Gauge, link: routeNames.socialWorker.dashboard },
  {
    label: "Users",
    icon: TruckDelivery,
    links: [
      { label: "Add Users", icon:UserPlus ,link: routeNames.socialWorker.addUser },
      { label: "All Users", link: routeNames.socialWorker.allUsers },
    ],
  },
  {
    label: "User Verification",
    icon: TruckDelivery,
    links: [
      { label: "Schedule Users", link: routeNames.socialWorker.scheduleUser },
      { label: "Verify User", link: routeNames.socialWorker.verifyUser },
      { label: "Verified Users", link: routeNames.socialWorker.verifiedUsers },
    ],
  },
  {
    label: "Appointments",
    icon: TruckDelivery,
    links: [
      { label: "Schedule Appointment", link: "/scheduleappointment" },
      { label: "View All", link: "/appointmentsAll" },
      { label: "Start a Session", link: "/session" },
      { label: "Refer to Export", link: "/refer" },
    ],
  },
  {
    label: "Reports",
    icon: TruckDelivery,
    links: [
      { label: "Private", link: "/reportspublic" },
      { label: "Public", link: "/reportsprivate" },
    ],
  },
];

export const bottom = [
  { label: "Settings", icon: Settings ,link: routeNames.socialWorker.settings},
  {
    label: "Log Out",
    icon: Power,
  },
];
