import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./Layout/General";
import AddAppointment from "./Pages/Appointments/AddAppointment";
import CreateAppointment from "./Pages/Appointments/CreateAppointment"
import AllAppointments from "./Pages/Appointments/AllAppointments";
import ScheduledAppointment from "./Pages/Appointments/ScheduledAppointments";
import Dashboard from "./Pages/Dashboard";
import AppointmentPageDashboard from "./Pages/Dashboard/AppointmentPage/index";
import ReportPageDashboard from "./Pages/Dashboard/ReportPage/index";
import UserPageDashboard from "./Pages/Dashboard/UserPage";
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
            <Route
              path={routeNames.socialWorker.addUser}
              element={<AddUser />}
            />
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
              path={routeNames.socialWorker.addAppoinment}
              element={<CreateAppointment />}
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
