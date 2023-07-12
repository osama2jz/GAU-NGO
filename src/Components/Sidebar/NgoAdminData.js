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
  Message,
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
      { label: "Verify User", link: routeNames.socialWorker.userVerification },
      {
        label: "Add Verification Appointment",
        link: routeNames.socialWorker.verificationScheduledUser,
      },
      {
        label: "View Verification Appointment",
        link: routeNames.socialWorker.verificationScheduled,
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
        label: "Appointment Schedule",
        link: routeNames.ngoAdmin.scheduledAppointments,
      },
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
      { label: "Project Reports", link: routeNames.socialWorker.allProjects },
      // { label: "Case Reports", link: routeNames.socialWorker.referalReport },
    ],
  },
  {
    label: "Complaints",
    icon: FileText,
    links: [{ label: "View Complaints", link: routeNames.ngoAdmin.complaints }],
  },
  {
    label: "User Forms",
    icon: ClipboardTypography,
    links: [{ label: "Update Forms", link: routeNames.ngoAdmin.userForms }],
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
      { label: "Make Donation", link: routeNames.ngoAdmin.addDonation },
      { label: "View Donations", link: routeNames.ngoAdmin.viewDonations },
    ],
  },
  {
    label: "Dictionary",
    icon: Language,
    links: [
      { label: "Add Dictionary", link: routeNames.ngoAdmin.addDictionary },
      { label: "View Dictionary", link: routeNames.ngoAdmin.ViewDictionary },
    ],
  },
  // { label: "Chats", icon: Message, link: routeNames.ngoAdmin.chat },
  { label: "Settings", icon: Settings, link: routeNames.socialWorker.settings },
];
