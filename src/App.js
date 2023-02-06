import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import GeneralLayout from "./Layout/General";
import { Dashboard } from "./Components/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GeneralLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
