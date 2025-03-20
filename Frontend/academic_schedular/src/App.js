import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Main/Layout";
import Home from "./Components/Main/Home";
import Exam from "./Components/Sub/Maheesha/Exam";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
