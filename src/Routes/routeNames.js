const routeNames = {
  general: {
    login: "/login",
    dashboard: "/",
  },
  socialWorker: {
    dashboard: "/",
    addUser: "/add-user",
    allUsers: "/all-users",
    scheduleUser: "/schedule-user",
    verifyUser: "/verify-user",
    verifiedUsers: "/verified-users",
    verificationScheduled: "/verfication-Scheduled",
    userVerification: "/userVerification",
    userVerification2: "/userVerification/:id",
    settings: "/settings",
    addAppoinment: "/add-appointment",
    startAppoinment: "/start-appointment",
    startAppoinment2: "/start-appointment/:id/:appId",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    publicReport: "/public-report",
    referalReport: "/referal-report",
  },
  pysch: {
    dashboard: "/",
    allUsers: "/all-users",
    scheduleUser: "/schedule-user",
    verifyUser: "/verify-user",
    verifiedUsers: "/verified-users",
    verificationScheduled: "/verfication-Scheduled",
    userVerification: "/userVerification",
    settings: "/settings",
    addAppoinment: "/add-appointment",
    startAppoinment: "/start-appointment",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    publicReport: "/public-report",
    referalReport: "/referal-report",
  },
  lawyer: {
    dashboard: "/",
    allUsers: "/all-users",
    scheduleUser: "/schedule-user",
    verifyUser: "/verify-user",
    verifiedUsers: "/verified-users",
    verificationScheduled: "/verfication-Scheduled",
    userVerification: "/userVerification",
    settings: "/settings",
    addAppoinment: "/add-appointment",
    startAppoinment: "/start-appointment",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    publicReport: "/public-report",
    referalReport: "/referal-report",
  },
  ngoAdmin: {
    dashboard: "/",
    addBranch:'/add-branch',
    viewBranches:'/view-branches',
    addProfessional:'/add-professional',
    viewProfessionals:'/view-professionals',
    addRoaster:'/add-roaster',
    viewRoasters:'/view-roasters',
    addUser: "/add-user",
    allUsers: "/all-users",
    scheduleUser: "/schedule-user",
    verifyUser: "/verify-user",
    verifiedUsers: "/verified-users",
    verificationScheduled: "/verfication-Scheduled",
    userVerification: "/userVerification",
    userVerification2: "/userVerification/:id",
    settings: "/settings",
    addAppoinment: "/add-appointment",
    startAppoinment: "/start-appointment",
    startAppoinment2: "/start-appointment/:id",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    publicReport: "/public-report",
    referalReport: "/referal-report",
    complaints: '/complaints-public',
    addDocument: '/add-document',
    viewDocuments: '/view-documents',
    addDonation: '/add-donation',
    viewDonations: '/view-donations'
  },
};

export default routeNames;
