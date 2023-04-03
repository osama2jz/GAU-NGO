import { NotificationsProvider } from "@mantine/notifications";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./Layout/General";
import { AddBranch } from "./NGOAdminPages/Branches/AddBranch";
import { ViewBranches } from "./NGOAdminPages/Branches/viewBranches";
import { ViewComplains } from "./NGOAdminPages/Complains";
import { AddComplains } from "./NGOAdminPages/Complains/addComplaints";
import { AddDocument } from "./NGOAdminPages/Documents/AddDocument";
import { ViewDocuments } from "./NGOAdminPages/Documents/ViewDocuments";
import { AddDonations } from "./NGOAdminPages/Donations/AddDonations";
import { ViewDonations } from "./NGOAdminPages/Donations/ViewDonations";
import { AddProfessional } from "./NGOAdminPages/Professionals/AddProfessional";
import { ViewProfessionals } from "./NGOAdminPages/Professionals/ViewProfessionals";
import AddProject from "./NGOAdminPages/Projects/AddProject";
import { ViewProjects } from "./NGOAdminPages/Projects/ViewProjects";
import { AddRoaster } from "./NGOAdminPages/Roaster/AddRoaster";
import { ViewRoasters } from "./NGOAdminPages/Roaster/ViewRoaster";
import UserForms from "./NGOAdminPages/UserForms";
import AddApp2 from "./Pages/Appointments/AddApp2";
import AddAppointment from "./Pages/Appointments/AddAppointment";
import AllAppointments from "./Pages/Appointments/AllAppointments";
import CreateAppointment from "./Pages/Appointments/CreateAppointment";
import EditAppointments from "./Pages/Appointments/EditAppointment";
import MissingDocuments from "./Pages/Appointments/MissingDocuments";
import ScheduledAppointment from "./Pages/Appointments/ScheduledAppointments";
import ViewAppointments from "./Pages/Appointments/ViewAppointment";
import Dashboard from "./Pages/Dashboard";
import AppointmentPageDashboard from "./Pages/Dashboard/AppointmentPage/index";
import BranchDashboard from "./Pages/Dashboard/BranchPage";
import ProfessionDashboard from "./Pages/Dashboard/ProfessionsPage";
import ReportPageDashboard from "./Pages/Dashboard/ReportPage/index";
import UserPageDashboard from "./Pages/Dashboard/UserPage";
import Auth from "./Pages/Login";
import ForgetPassword from "./Pages/Login/ForgetPassword";
import NewPassword from "./Pages/Login/ForgetPassword/NewPassword";
import OTP from "./Pages/Login/ForgetPassword/OTP";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import VerificationSchedule from "./Pages/Login/VerificationSchedule";
import VerificationPending from "./Pages/Login/VerificationSchedule/VerificationPending";
import MySchedule from "./Pages/MySchedule/Schedule";
import PrivateReport from "./Pages/Reports/Private";
import PublicReport from "./Pages/Reports/Public";
import ReferalReport from "./Pages/Reports/Referal";
import Settings from "./Pages/Setting";
import { AddUser } from "./Pages/Users/AddUser";
import { AllUser } from "./Pages/Users/AllUsers";
import { UserVerification } from "./Pages/Users/UserVerification";
import VerificationScheduled from "./Pages/Users/VerificationScheduled";
import ViewUser from "./Pages/Users/ViewUser";
import { ScheduleUser } from "./Pages/UserVerification/Schedule";
import { VerifyUser } from "./Pages/UserVerification/VerifyUser";
import routeNames from "./Routes/routeNames";

function App() {
  return (
    <NotificationsProvider
      position="top-center"
      zIndex={2077}
      style={{ marginTop: "60px" }}
    >
      <Routes>
        <Route path={routeNames.general.auth} element={<Auth />}>
          <Route path={routeNames.general.login} element={<Login />} />
          <Route path={routeNames.general.signup} element={<Signup />} />
          <Route
            path={routeNames.general.verificationPending}
            element={<VerificationPending />}
          />
          <Route
            path={routeNames.general.forgetPassword}
            element={<ForgetPassword />}
          />
          <Route path={routeNames.general.otp} element={<OTP />} />
          <Route
            path={routeNames.general.resetPassword}
            element={<NewPassword />}
          />
        </Route>
        <Route
          path={routeNames.general.verificationSchedule}
          element={<VerificationSchedule />}
        />
        <Route path="/" element={<GeneralLayout />}>
          <Route
            path={routeNames.socialWorker.dashboard}
            element={<Dashboard />}
          />
          <Route
            path={routeNames.ngoAdmin.addProject}
            element={<AddProject />}
          />
          <Route
            path={routeNames.ngoAdmin.viewProject}
            element={<ViewProjects />}
          />
          <Route path={routeNames.socialWorker.addUser} element={<AddUser />} />
          <Route
            path={routeNames.socialWorker.allUsers}
            element={<AllUser />}
          />
          <Route
            path={routeNames.socialWorker.viewUser}
            element={<ViewUser />}
          />
          <Route
            path={routeNames.socialWorker.scheduleUser}
            element={<ScheduleUser />}
          />
          <Route
            path={routeNames.socialWorker.verificationScheduled}
            element={<VerificationScheduled />}
          />
          <Route
            path={routeNames.socialWorker.verifyUser}
            element={<VerifyUser />}
          />
          <Route
            path={routeNames.socialWorker.verifiedUsers}
            element={<VerifyUser />}
          />
          <Route
            path={routeNames.socialWorker.settings}
            element={<Settings />}
          />
          <Route
            path={routeNames.socialWorker.allAppointments}
            element={<AllAppointments />}
          />
          <Route
            path={routeNames.socialWorker.missingDocuments}
            element={<MissingDocuments />}
          />
          <Route
            path={routeNames.socialWorker.scheduledAppointments}
            element={<ScheduledAppointment />}
          />
          <Route
            path={routeNames.socialWorker.userVerification}
            element={<UserVerification />}
          />
          <Route
            path={routeNames.socialWorker.userVerification2}
            element={<UserVerification />}
          />
          <Route
            path={routeNames.socialWorker.userEditDetails}
            element={<UserVerification />}
          />
          <Route
            path={routeNames.socialWorker.userPageDashboard}
            element={<UserPageDashboard />}
          />
          <Route
            path={routeNames.socialWorker.appointmentPageDashboard}
            element={<AppointmentPageDashboard />}
          />
          <Route
            path={routeNames.socialWorker.reportPageDashboard}
            element={<ReportPageDashboard />}
          />
          <Route
            path={routeNames.ngoAdmin.professionPageDashboard}
            element={<ProfessionDashboard />}
          />
          <Route
            path={routeNames.ngoAdmin.branchPageDashboard}
            element={<BranchDashboard />}
          />
          <Route
            path={routeNames.socialWorker.mySchedule}
            element={<MySchedule />}
          />
          <Route
            path={routeNames.socialWorker.privateReport}
            element={<PrivateReport />}
          />
          <Route
            path={routeNames.socialWorker.publicReport}
            element={<PublicReport />}
          />
          <Route
            path={routeNames.socialWorker.referalReport}
            element={<ReferalReport />}
          />
          <Route
            path={routeNames.socialWorker.startAppoinment}
            element={<AddAppointment />}
          />
          <Route
            path={routeNames.socialWorker.startAppoinment2}
            element={<AddAppointment />}
          />
          <Route
            path={routeNames.pysch.startAppoinment2}
            element={<AddApp2 />}
          />
          <Route
            path={routeNames.socialWorker.addAppoinment}
            element={<CreateAppointment />}
          />
          <Route path={routeNames.ngoAdmin.addBranch} element={<AddBranch />} />
          <Route
            path={routeNames.ngoAdmin.editBranch}
            element={<AddBranch />}
          />

          <Route
            path={routeNames.ngoAdmin.viewBranches}
            element={<ViewBranches />}
          />
          <Route
            path={routeNames.ngoAdmin.addProfessional}
            element={<AddProfessional />}
          />
          <Route
            path={routeNames.ngoAdmin.editProfessional}
            element={<AddProfessional />}
          />
          <Route
            path={routeNames.ngoAdmin.viewProfessionals}
            element={<ViewProfessionals />}
          />
          <Route
            path={routeNames.ngoAdmin.addRoaster}
            element={<AddRoaster />}
          />
          <Route
            path={routeNames.ngoAdmin.viewRoasters}
            element={<ViewRoasters />}
          />
          <Route
            path={routeNames.ngoAdmin.addDocument}
            element={<AddDocument />}
          />
          <Route
            path={routeNames.ngoAdmin.viewDocuments}
            element={<ViewDocuments />}
          />
          <Route
            path={routeNames.ngoAdmin.viewDonations}
            element={<ViewDonations />}
          />
          <Route
            path={routeNames.user.addDonation}
            element={<AddDonations />}
          />
          <Route
            path={routeNames.ngoAdmin.complaints}
            element={<ViewComplains />}
          />
          <Route
            path={routeNames.user.addComplaint}
            element={<AddComplains />}
          />
          <Route
            path={routeNames.socialWorker.editAppoinment}
            element={<EditAppointments />}
          />
          <Route
            path={routeNames.socialWorker.viewAppoinment}
            element={<ViewAppointments />}
          />
          <Route path={routeNames.ngoAdmin.userForms} element={<UserForms />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={routeNames.general.dashboard} />}
        />
      </Routes>
    </NotificationsProvider>
  );
}

export default App;
