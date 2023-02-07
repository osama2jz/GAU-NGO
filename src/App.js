import "./App.css";
import { Route, Routes } from "react-router-dom";
import GeneralLayout from "./Layout/General";
import Dashboard from "./Pages/Dashboard";
import { AddUser } from "./Pages/Users/AddUser";
import { AllUser } from "./Pages/Users/AllUsers";
import routeNames from "./Routes/routeNames";
import { ScheduleUser } from "./Pages/UserVerification/Schedule";
import { VerifyUser } from "./Pages/UserVerification/VerifyUser";
import Settings from "./Pages/Setting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GeneralLayout />}>
        <Route path={routeNames.socialWorker.dashboard} element={<Dashboard />} />
        <Route path={routeNames.socialWorker.addUser} element={<AddUser />} />
        <Route path={routeNames.socialWorker.allUsers} element={<AllUser />} />
        <Route path={routeNames.socialWorker.scheduleUser} element={<ScheduleUser />} />
        <Route path={routeNames.socialWorker.verifyUser} element={<VerifyUser />} />
        <Route path={routeNames.socialWorker.verifiedUsers} element={<VerifyUser />} />
        <Route path={routeNames.socialWorker.settings} element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
