import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import EditSchedule from "./pages/EditSchedule/EditSchedule";
import Schedules from "./pages/Schedules/Schedules";
import Home from "./pages/Home/Home";
import PrivateRoute from "./components/PrivateRoutes";
import CreateSchedule from "./pages/CreateSchedule/CreateSchedule";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/edit-schedule/:id" element={<EditSchedule />} />
          <Route path="/create" element={<CreateSchedule />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
