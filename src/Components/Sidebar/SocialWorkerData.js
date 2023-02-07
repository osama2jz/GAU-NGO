import {
  Car,
  Gauge,
  Logout,
  ManualGearbox,
  Power,
  Settings,
  TruckDelivery,
} from "tabler-icons-react";
export const socialSideBarData = [
  { label: "Dashboard", icon: Gauge, link: "/" },
  {
    label: "Users",
    icon: TruckDelivery,
    links: [
      { label: "Add Users", link: "/adduser" },
      { label: "All Users", link: "/allusers" },
    ],
  },
  {
    label: "User Verification",
    icon: TruckDelivery,
    links: [
      { label: "Add Users", link: "/" },
      { label: "All Users", link: "/" },
    ],
  },
  {
    label: "Appointments",
    icon: TruckDelivery,
    links: [
      { label: "Add Users", link: "/" },
      { label: "All Users", link: "/" },
    ],
  },
];

export const bottom = [
  { label: "Settings", icon: Settings },
  {
    label: "Log Out",
    icon: Power,
  },
];
