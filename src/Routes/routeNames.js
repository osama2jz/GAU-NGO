const routeNames = {
  general: {
    auth: "/auth",
    login: "/auth/login",
    signup: "/auth/signup",
    proSignup: "/auth/signup-professional",
    forgetPassword: "/auth/forget-password",
    otp: "/auth/verify-otp",
    resetPassword: "/auth/reset-password",
    dashboard: "/",
    verificationSchedule: "/schedule-verification",
    verificationPending: "/auth/pending-verification",
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
    missingDocuments: "/missing-document-appointments",
    userEditDetails: "/user-Edit",
    settings: "/settings",
    addAppoinment: "/add-appointment",
    startAppoinment: "/start-appointment",
    startAppoinment2: "/start-appointment-start",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    editAppoinment: "/edit-appointment",
    viewAppoinment: "/view-appointment",
    viewUser: "/view-user",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    publicReport: "/public-report",
    projectReport: "/project-report",
    referalReport: "/referal-report",
    projectCases: "/project-cases",
    projectUsers: "/project-users",
    allProjects: "/all-projects",
    projectAppointments: "/project-appointments",
    caseAppointments: "/case-appointments",
  },
  pysch: {
    dashboard: "/",
    allUsers: "/all-users",
    scheduleUser: "/schedule-user",
    verifyUser: "/verify-user",
    verifiedUsers: "/verified-users",
    verificationScheduled: "/verfication-Scheduled",
    userVerification: "/userVerification",
    missingDocuments: "/missing-document-appointments",
    settings: "/settings",
    addAppoinment: "/add-appointment",
    startAppoinment2: "/start-appointment-p",
    editAppoinment: "/edit-appointment",
    viewAppoinment: "/view-appointment",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    viewUser: "/view-user",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    publicReport: "/public-report",
    projectReport: "/project-report",
    projectUsers: "/project-users",
    referalReport: "/referal-report",
    projectCases: "/project-cases",
    allProjects: "/all-projects",
    projectAppointments: "/project-appointments",
    caseAppointments: "/case-appointments",
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
    missingDocuments: "/missing-document-appointments",
    addAppoinment: "/add-appointment",
    startAppoinment: "/start-appointment",
    startAppoinment2: "/start-appointment-start",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    editAppoinment: "/edit-appointment",
    viewUser: "/view-user",
    viewAppoinment: "/view-appointment",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    projectReport: "/project-report",
    projectUsers: "/project-users",
    publicReport: "/public-report",
    referalReport: "/referal-report",
    projectCases: "/project-cases",
    allProjects: "/all-projects",
    projectAppointments: "/project-appointments",
    caseAppointments: "/case-appointments",
  },
  ngoAdmin: {
    dashboard: "/",
    addBranch: "/add-branch",
    editBranch: "/edit-branch",
    viewBranches: "/view-branches",
    addProfessional: "/add-professional",
    editProfessional: "/edit-professional",
    viewProfessionals: "/view-professionals",
    missingDocuments: "/missing-document-appointments",
    addProject: "/add-project",
    viewProject: "/view-project",
    addRoaster: "/add-roaster",
    viewRoasters: "/view-roasters",
    editAppoinment: "/edit-appointment",
    viewAppoinment: "/view-appointment",
    addUser: "/add-user",
    allUsers: "/all-users",
    viewUser: "/view-user",
    scheduleUser: "/schedule-user",
    verifyUser: "/verify-user",
    verifiedUsers: "/verified-users",
    verificationScheduled: "/verfication-Scheduled",
    userVerification: "/userVerification",
    userVerification2: "/edit-userVerification",
    settings: "/settings",
    addAppoinment: "/add-appointment",
    startAppoinment: "/start-appointment",
    startAppoinment2: "/start-appointment/:id",
    allAppointments: "/all-appointments",
    scheduledAppointments: "/scheduled-appointments",
    userPageDashboard: "/user-page-dashboard",
    appointmentPageDashboard: "/appointment-page-dashboard",
    professionPageDashboard: "/profession-page-dashboard",
    branchPageDashboard: "/branch-page-dashboard",
    reportPageDashboard: "/report-page-dashboard",
    mySchedule: "/my-schedule",
    privateReport: "/private-report",
    publicReport: "/public-report",
    projectUsers: "/project-users",
    projectReport: "/project-report",
    referalReport: "/referal-report",
    complaints: "/complaints-public",
    addDocument: "/add-document",
    viewDocuments: "/view-documents",
    addDonation: "/add-donation",
    viewDonations: "/view-donations",
    allProjects: "/all-projects",
    projectCases: "/project-cases",
    caseAppointments: "/case-appointments",
    projectAppointments: "/project-appointments",
    userForms: "/user-forms",
    addDictionary: "/add-dictionary",
    ViewDictionary: "/view-dictionary",
  },
  user: {
    dashboard: "/",
    addAppoinment: "/add-appointment",
    allAppointments: "/all-appointments",
    addDonation: "/add-donation",
    viewDonations: "/view-donations",
    addComplaint: "/add-complaint",
    missingDocuments: "/missing-document-appointments",
    viewComplaint: "/view-complaints",
    settings: "/settings",
    editAppoinment: "/edit-appointment",
    viewAppoinment: "/view-appointment",
    complaints: "/complaints-public",
    allProjects: "/all-projects",
    projectCases: "/project-cases",
    caseAppointments: "/case-appointments",
    projectAppointments: "/project-appointments",
  },
};

export default routeNames;
