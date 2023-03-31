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
    label: "Appointment",
    icon: CalendarEvent,
    links: [
      {
        label: "Add Appointment",
        link: routeNames.ngoAdmin.addAppoinment,
      },
      {
        label: "View Appointments",
        link: routeNames.ngoAdmin.allAppointments,
      },
      {
        label: "Missing Documents",
        link: routeNames.ngoAdmin.missingDocuments,
      },
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
      { label: "Make Donation", link: routeNames.user.addDonation },
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
