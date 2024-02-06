import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar';
import Projects from './components/pages/Projects';
import Footer from './components/layout/Footer';
import ProjectEdit from './components/pages/ProjectEdit';


function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectEdit />} />
          </Routes>
      </Router>

      <Footer></Footer>
    </>
  );
}

export default App;
