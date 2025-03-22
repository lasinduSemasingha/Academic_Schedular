import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Main/Layout";
import Home from "./Components/Main/Home";
import Exam from "./Components/Sub/Maheesha/Exam";
import Student from "./Components/Sub/Kaveesha/Student";
import StudentHome from "./Components/Sub/Kaveesha/StudentHome";
import Studenttable from "./Components/Sub/Kaveesha/Studenttable";



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/student" element={<Student/>}/>
          <Route path="/studenttable" element={<Studenttable/>}/>
          <Route path="/studenthome" element={<StudentHome/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
