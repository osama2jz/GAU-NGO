import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./Layout/General";
import AddAppointment from "./Pages/Appointments/AddAppointment";
import CreateAppointment from "./Pages/Appointments/CreateAppointment";
import AllAppointments from "./Pages/Appointments/AllAppointments";
import ScheduledAppointment from "./Pages/Appointments/ScheduledAppointments";
import Dashboard from "./Pages/Dashboard";
import AppointmentPageDashboard from "./Pages/Dashboard/AppointmentPage/index";
import ReportPageDashboard from "./Pages/Dashboard/ReportPage/index";
import UserPageDashboard from "./Pages/Dashboard/UserPage";
import ProfessionDashboard from "./Pages/Dashboard/ProfessionsPage";
import BranchDashboard from "./Pages/Dashboard/BranchPage";
import Login from "./Pages/Login";
import MySchedule from "./Pages/MySchedule/Schedule";
import PrivateReport from "./Pages/Reports/Private";
import PublicReport from "./Pages/Reports/Public";
import ReferalReport from "./Pages/Reports/Referal";
import Settings from "./Pages/Setting";
import { AddUser } from "./Pages/Users/AddUser";
import { AllUser } from "./Pages/Users/AllUsers";
import { UserVerification } from "./Pages/Users/UserVerification";
import VerificationScheduled from "./Pages/Users/VerificationScheduled";
import { ScheduleUser } from "./Pages/UserVerification/Schedule";
import { VerifyUser } from "./Pages/UserVerification/VerifyUser";
import routeNames from "./Routes/routeNames";
import { AddBranch } from "./NGOAdminPages/Branches/AddBranch";
import { ViewBranches } from "./NGOAdminPages/Branches/viewBranches";
import { AddProfessional } from "./NGOAdminPages/Professionals/AddProfessional";
import { ViewProfessionals } from "./NGOAdminPages/Professionals/ViewProfessionals";
import { AddRoaster } from "./NGOAdminPages/Roaster/AddRoaster";
import { AddDocument } from "./NGOAdminPages/Documents/AddDocument";
import { ViewRoasters } from "./NGOAdminPages/Roaster/ViewRoaster";
import AddApp2 from "./Pages/Appointments/AddApp2";
import { ViewDocuments } from "./NGOAdminPages/Documents/ViewDocuments";
import { ViewDonations } from "./NGOAdminPages/Donations/ViewDonations";
import { ViewComplains } from "./NGOAdminPages/Complains";
import { AddComplains } from "./NGOAdminPages/Complains/addComplaints";
import EditAppointments from "./Pages/Appointments/EditAppointment";

function App() {
  return (
    <NotificationsProvider
      position="top-center"
      zIndex={2077}
      style={{ marginTop: "60px" }}
    >
      <Routes>
        <Route path={routeNames.general.login} element={<Login />} />
        <Route path="/" element={<GeneralLayout />}>
          <Route
            path={routeNames.socialWorker.dashboard}
            element={<Dashboard />}
          />
          <Route path={routeNames.socialWorker.addUser} element={<AddUser />} />
          <Route
            path={routeNames.socialWorker.allUsers}
            element={<AllUser />}
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
            path={routeNames.ngoAdmin.viewBranches}
            element={<ViewBranches />}
          />
          <Route
            path={routeNames.ngoAdmin.addProfessional}
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
