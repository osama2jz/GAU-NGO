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
  label: "User",
  icon: Users,
  links: [
   {
    label: "Users Schedule",
    link: routeNames.socialWorker.verificationScheduled,
   },
   {
    label: "Add User",
    icon: UserPlus,
    link: routeNames.socialWorker.addUser,
   },
   { label: "View Users", link: routeNames.socialWorker.allUsers },
   { label: "Verify User", link: routeNames.socialWorker.userVerification },
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
   { label: "Add Appointment", link: "/add-appointment" },
   {
    label: "View Appointments",
    link: routeNames.socialWorker.allAppointments,
   },
  ],
 },
 {
  label: "My Schedule",
  icon: CalendarTime,
  links: [
   { label: "Appointment Schedule", link: "/" },
   { label: "View All", link: "/" },
   { label: "Start a Session", link: "/" },
   { label: "Refer to Export", link: "/" },
  ],
 },
 {
  label: "Report",
  icon: Report,
  links: [
   { label: "Private", link: "/" },
   { label: "Public", link: "/" },
   { label: "Referral", link: "/" },
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
];

export const bottom = [
 { label: "Settings", icon: Settings, link: routeNames.socialWorker.settings },
 {
  label: "Log Out",
  link: "/",
  icon: Power,
 },
];
