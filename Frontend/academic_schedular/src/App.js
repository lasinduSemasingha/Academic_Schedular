import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Main/Layout";
import Home from "./Components/Main/Home";
import Exam from "./Components/Sub/Maheesha/Exam";
import Invigilators from "./Components/Sub/Maheesha/Invigilator";
import Hall from "./Components/Sub/Maheesha/Hall";
import InvigilatorTable from "./Components/Sub/Maheesha/InvigilatorTable";
import ExamTable from "./Components/Sub/Maheesha/ExamTable";
import HallTable from "./Components/Sub/Maheesha/HallTable";
import EditInvigilator from "./Components/Sub/Maheesha/EditInvigilator";
import EditExam from "./Components/Sub/Maheesha/EditExam";
import ExamCoordinator from "./Components/Sub/Maheesha/ExamHome";
import ResourceManagement from "./Components/Sub/Lasindu/Resource/ResourceManagement";
import SettingsPage from "./Components/Sub/Lasindu/Settings/SettingsPage";
import LoginPage from "./Components/Main/Auth/Login";
import Student from "./Components/Sub/Kaveesha/Student";
import StudentHome from "./Components/Sub/Kaveesha/StudentHome";
import Studenttable from "./Components/Sub/Kaveesha/Studenttable";
import EditStudent from "./Components/Sub/Kaveesha/EditStudent";

import AcademicSchedule from "./Components/Main/TimeTable/AcademicSchedule";
import AddResources from "./Components/Sub/Lasindu/Resource/AddResources";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/examHome" element={<ExamCoordinator />} />
          <Route path="/exam/ExamTable" element={<ExamTable/>}/>
          <Route path="/exam/edit" element={<EditExam/>}/>
          <Route path="/invigilator" element={<Invigilators />} />
          <Route path="/invigilator/InvigilatorTable" element={<InvigilatorTable />} />
          <Route path="/invigilator/edit" element={<EditInvigilator />} />
          <Route path="/hall" element={<Hall/>} />
          <Route path="/hall/HallTable" element={<HallTable/>} />
          <Route path="/resource" element={<ResourceManagement />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/timetable" element={<AcademicSchedule />} />

          {/* Resource Endpoints*/}
          <Route path="/addResource" element={<AddResources />} />

          <Route path="/student" element={<Student/>}/>
          <Route path="/studenttable" element={<Studenttable/>}/>
          <Route path="/studenthome" element={<StudentHome/>}/>
          <Route path="/editstudent" element={<EditStudent/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
