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
import ExamInfo from "./Components/Sub/Maheesha/ExamInfo";
import ResourceManagement from "./Components/Sub/Lasindu/Resource/ResourceManagement";
import SettingsPage from "./Components/Sub/Lasindu/Settings/SettingsPage";
import Lecturer from "./Components/Sub/Manuji/Lecturer";
import LecturerHome from "./Components/Sub/Manuji/LecturerHome";
import LecturerTable from "./Components/Sub/Manuji/LecturerTable";
import EditLecturer from "./Components/Sub/Manuji/EditLecturer";
import LoginPage from "./Components/Main/Auth/Login";
import EnglishExamInfo from "./Components/Sub/Maheesha/EnglishExamInfo";
import ArtsExamInfo from "./Components/Sub/Maheesha/ArtsExamInfo";
import EngineeringExamInfo from "./Components/Sub/Maheesha/EngineeringExamInfo";
import Student from "./Components/Sub/Kaveesha/Student";
import StudentHome from "./Components/Sub/Kaveesha/StudentHome";
import Studenttable from "./Components/Sub/Kaveesha/Studenttable";
import EditStudent from "./Components/Sub/Kaveesha/EditStudent";

import AcademicSchedule from "./Components/Main/TimeTable/AcademicSchedule";
import AddResources from "./Components/Sub/Lasindu/Resource/AddResources";
import EditResource from "./Components/Sub/Lasindu/Resource/EditResource";

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
          {/* <Route path="/hall/edit" element={<EditHall />} /> */}
          <Route path="/ExamInfo" element={<ExamInfo/>}/>
          <Route path="/EnglishExamInfo" element={<EnglishExamInfo/>}/>
          <Route path="/ArtsExamInfo" element={<ArtsExamInfo/>}/>
          
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/EngineeringExamInfo" element={<EngineeringExamInfo/>}/>
          <Route path="/timetable" element={<AcademicSchedule />} />

          {/* Resource Endpoints*/}
          <Route path="/addResource" element={<AddResources />} />
          <Route path="/resource" element={<ResourceManagement />} />
          <Route path="/editresource/:id" element={<EditResource />} />

          <Route path="/lecturer" element={<Lecturer />} />
          <Route path="/lecturerhome" element={<LecturerHome />} />
          <Route path="/lecturertable" element={<LecturerTable />} />
          <Route path="/editlecturer" element={<EditLecturer />} />

          <Route path="/student" element={<Student />} />
          <Route path="/studenthome" element={<StudentHome />} />
          <Route path="/studenttable" element={<Studenttable />} />
          <Route path="/editstudent" element={<EditStudent />} />

          {/* Add other routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
