import "./App.css";
import { Route, Routes } from "react-router-dom";
import GeneralLayout from "./Layout/General";
import { Dashboard } from "./Components/Dashboard";
import { AddUser } from "./Pages/Users/AddUser";
import { AllUser } from "./Pages/Users/AllUsers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GeneralLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/allusers" element={<AllUser />} />
      </Route>
    </Routes>
  );
}

export default App;
