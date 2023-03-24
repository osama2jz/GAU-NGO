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
} from "tabler-icons-react";
import routeNames from "../../Routes/routeNames";
import userlogo from "../../assets/dollar.svg";

export const ngoAdminSideBarData = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: routeNames.socialWorker.dashboard,
  },
  {
    label: "Branches",
    icon: Building,
    links: [
      {
        label: "Add Branch",
        link: routeNames.ngoAdmin.addBranch,
      },
      {
        label: "View Branches",
        link: routeNames.ngoAdmin.viewBranches,
      },
    ],
  },
  {
    label: "Projects",
    icon: Building,
    links: [
      {
        label: "Add Project",
        link: routeNames.ngoAdmin.addProject,
      },
      {
        label: "View Projects",
        link: routeNames.ngoAdmin.viewProject,
      },
    ],
  },
  {
    label: "Professional",
    icon: Users,
    links: [
      {
        label: "Add Professional",
        link: routeNames.ngoAdmin.addProfessional,
      },
      {
        label: "View Professionals",
        link: routeNames.ngoAdmin.viewProfessionals,
      },
    ],
  },
  {
    label: "Roasters",
    icon: Clock,
    links: [
      {
        label: "Add Roaster",
        link: routeNames.ngoAdmin.addRoaster,
      },
      {
        label: "View Roasters",
        link: routeNames.ngoAdmin.viewRoasters,
      },
    ],
  },
  {
    label: "User",
    icon: Users,
    links: [{ label: "View Users", link: routeNames.ngoAdmin.allUsers }],
  },
  {
    label: "Appointment",
    icon: CalendarEvent,
    links: [
      {
        label: "View Appointments",
        link: routeNames.ngoAdmin.allAppointments,
      },
      // {
      //   label: "Add Appointment",
      //   link: routeNames.ngoAdmin.addAppoinment,
      // },
    ],
  },
  {
    label: "Report",
    icon: Report,
    links: [
      { label: "Private", link: routeNames.ngoAdmin.privateReport },
      { label: "Public", link: routeNames.ngoAdmin.publicReport },
      { label: "Case Reports", link: routeNames.socialWorker.referalReport },
    ],
  },
  {
    label: "Complaints",
    icon: FileText,
    links: [{ label: "View Complaints", link: routeNames.ngoAdmin.complaints }],
  },
  {
    label: "Documents",
    icon: FileBarcode,
    links: [
      { label: "Add Document", link: routeNames.ngoAdmin.addDocument },
      { label: "View Documents", link: routeNames.ngoAdmin.viewDocuments },
    ],
  },
  {
    label: "Donations",
    icon: CurrencyDollar,
    links: [
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
