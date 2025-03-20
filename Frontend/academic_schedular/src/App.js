import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Main/Layout";
import Home from "./Components/Main/Home";
import Exam from "./Components/Sub/Maheesha/Exam";
import Lecturer from "./Components/Sub/Manuji/Lecturer";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/lecturer" element={<Lecturer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
