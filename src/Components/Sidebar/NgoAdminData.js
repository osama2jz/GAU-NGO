import {
  CalendarEvent,
  CalendarTime,
  LayoutDashboard,
  Power,
  Report,
  Settings,
  UserPlus,
  Users,
} from "tabler-icons-react";
import routeNames from "../../Routes/routeNames";
export const ngoAdminSideBarData = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: routeNames.socialWorker.dashboard,
  },
  {
    label: "Branches",
    icon: Users,
    links: [
      {
        label: "Add Branch",
        link: routeNames.ngoAdmin.addBranch,
      },
      {
        label: "View Branches",
        icon: UserPlus,
        link: routeNames.ngoAdmin.viewBranches,
      },
    ],
  },
  {
    label: "Professionals",
    icon: Users,
    links: [
      {
        label: "Add Professional",
        link: routeNames.ngoAdmin.addProfessional,
      },
      {
        label: "View Professionals",
        icon: UserPlus,
        link: routeNames.ngoAdmin.viewProfessionals,
      },
    ],
  },
  {
    label: "Roasters",
    icon: Users,
    links: [
      {
        label: "Add Roaster",
        link: routeNames.ngoAdmin.addRoaster,
      },
      {
        label: "View Roasters",
        icon: UserPlus,
        link: routeNames.ngoAdmin.viewRoasters,
      },
    ],
  },
  {
    label: "User",
    icon: Users,
    links: [
      {
        label: "Add User",
        icon: UserPlus,
        link: routeNames.ngoAdmin.addUser,
      },
      { label: "View Users", link: routeNames.ngoAdmin.allUsers },
    ],
  },
  {
    label: "Appointment",
    icon: CalendarEvent,
    links: [
      {
        label: "View Appointments",
        link: routeNames.ngoAdmin.allAppointments,
      },
      {
        label: "Add Appointment",
        link: routeNames.ngoAdmin.addAppoinment,
      },
    ],
  },
  {
    label: "Report",
    icon: Report,
    links: [
      // { label: "Private", link: routeNames.ngoAdmin.privateReport },
      { label: "Public", link: routeNames.ngoAdmin.publicReport },
    ],
  },
  {
    label: "Complaints",
    icon: Report,
    links: [{ label: "Public", link: routeNames.ngoAdmin.complaints }],
  },
  {
    label: "Documents",
    icon: Report,
    links: [
      { label: "Add Document", link: routeNames.ngoAdmin.addDocument },
      { label: "View Documents", link: routeNames.ngoAdmin.viewDocuments },
    ],
  },
  {
    label: "Donations",
    icon: Report,
    links: [
      // { label: "Add Donations", link: routeNames.ngoAdmin.addDonation },
      { label: "View Donations", link: routeNames.ngoAdmin.viewDonations },
    ],
  },
];

export const bottom = [
  { label: "Settings", icon: Settings, link: routeNames.socialWorker.settings },
  {
    label: "Log Out",
    link: routeNames.general.login,
    icon: Power,
  },
];
