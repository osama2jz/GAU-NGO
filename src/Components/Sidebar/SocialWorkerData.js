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
export const socialSideBarData = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: routeNames.socialWorker.dashboard,
  },
  {
    label: "User",
    icon: Users,
    links: [
     
      {
        label: "Add User",
        icon: UserPlus,
        link: routeNames.socialWorker.addUser,
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
      { label: "View Users", link: routeNames.socialWorker.allUsers },
    ],
  },
  {
    label: "Appointment",
    icon: CalendarEvent,
    links: [
      {
        label: "Appointment Schedule",
        link: routeNames.socialWorker.scheduledAppointments,
      },
      { label: "Add Appointment", link: routeNames.socialWorker.addAppoinment },

      {
        label: "View Appointments",
        link: routeNames.socialWorker.allAppointments,
      },
      {
        label: "Missing Documents",
        link: routeNames.socialWorker.missingDocuments,
      },
    ],
  },
  {
    label: "My Schedule",
    icon: CalendarTime,
    links: [{ label: "My Schedule", link: routeNames.socialWorker.mySchedule }],
  },
  {
    label: "Report",
    icon: Report,
    links: [
      { label: "Private", link: routeNames.socialWorker.privateReport },
      { label: "Public", link: routeNames.socialWorker.publicReport },
      { label: "Project Reports", link: routeNames.socialWorker.allProjects },
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
