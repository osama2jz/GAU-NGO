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
export const UserSidebarData = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: routeNames.user.dashboard,
  },
  {
    label: "Appointment",
    icon: CalendarEvent,
    links: [
      { label: "Schedule Appointment", link: routeNames.user.addAppoinment },
      {
        label: "View Appointments",
        link: routeNames.user.allAppointments,
      },
    ],
  },
  {
    label: "Donations",
    icon: CalendarTime,
    links: [
      { label: "Make Donation", link: routeNames.user.addDonation },
      { label: "View Donations", link: routeNames.user.viewDonations },
    ],
  },
  {
    label: "Complaints",
    icon: CalendarTime,
    links: [
      { label: "Make Complaint", link: routeNames.user.addComplaint },
      { label: "View Complaint", link: routeNames.user.viewComplaint },
    ],
  },
];

export const bottom = [
  { label: "Settings", icon: Settings, link: routeNames.user.settings },
  {
    label: "Log Out",
    link: "/",
    icon: Power,
  },
];
