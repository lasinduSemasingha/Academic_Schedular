// src/App.js

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
import RegisterPage from "./Components/Main/Auth/RegisterPage";
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
import UploadAnswerSheet from "./Components/MarkingManager/UploadAnswerSheet";
import MarkStudentAnswerSheet from "./Components/MarkingManager/MarkStudentAnswerSheet";

import ProtectedRoute from "./Components/Main/Auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route path="/exam" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
          <Route path="/examHome" element={<ProtectedRoute><ExamCoordinator /></ProtectedRoute>} />
          <Route path="/exam/ExamTable" element={<ProtectedRoute><ExamTable /></ProtectedRoute>} />
          <Route path="/exam/edit/:id" element={<ProtectedRoute><EditExam /></ProtectedRoute>} />

          <Route path="/invigilator" element={<ProtectedRoute><Invigilators /></ProtectedRoute>} />
          <Route path="/invigilator/InvigilatorTable" element={<ProtectedRoute><InvigilatorTable /></ProtectedRoute>} />
          <Route path="/invigilator/edit" element={<ProtectedRoute><EditInvigilator /></ProtectedRoute>} />

          <Route path="/hall" element={<ProtectedRoute><Hall /></ProtectedRoute>} />
          <Route path="/hall/HallTable" element={<ProtectedRoute><HallTable /></ProtectedRoute>} />
          {/* <Route path="/hall/edit" element={<ProtectedRoute><EditHall /></ProtectedRoute>} /> */}

          <Route path="/ExamInfo" element={<ProtectedRoute><ExamInfo /></ProtectedRoute>} />
          <Route path="/EnglishExamInfo" element={<ProtectedRoute><EnglishExamInfo /></ProtectedRoute>} />
          <Route path="/ArtsExamInfo" element={<ProtectedRoute><ArtsExamInfo /></ProtectedRoute>} />
          <Route path="/EngineeringExamInfo" element={<ProtectedRoute><EngineeringExamInfo /></ProtectedRoute>} />

          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/timetable" element={<ProtectedRoute><AcademicSchedule /></ProtectedRoute>} />

          <Route path="/addResource" element={<ProtectedRoute><AddResources /></ProtectedRoute>} />
          <Route path="/resource" element={<ProtectedRoute><ResourceManagement /></ProtectedRoute>} />
          <Route path="/editresource/:id" element={<ProtectedRoute><EditResource /></ProtectedRoute>} />

          <Route path="/lecturer" element={<ProtectedRoute><Lecturer /></ProtectedRoute>} />
          <Route path="/lecturerhome" element={<ProtectedRoute><LecturerHome /></ProtectedRoute>} />
          <Route path="/lecturertable" element={<ProtectedRoute><LecturerTable /></ProtectedRoute>} />
          <Route path="/editlecturer" element={<ProtectedRoute><EditLecturer /></ProtectedRoute>} />

          <Route path="/student" element={<ProtectedRoute><Student /></ProtectedRoute>} />
          <Route path="/studenthome" element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
          <Route path="/studenttable" element={<ProtectedRoute><Studenttable /></ProtectedRoute>} />
          <Route path="/editstudent" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />

          <Route path="/marking-manager" element={<ProtectedRoute><UploadAnswerSheet /></ProtectedRoute>} />
          <Route path="/add-marks" element={<ProtectedRoute><MarkStudentAnswerSheet /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
