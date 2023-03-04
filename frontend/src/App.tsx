import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./components/HomePage";
import FormBuilder from "./components/FormBuilder";
import Publish from "./components/Publish";
import FormView from "./components/FormView";
import Templates from "./components/Templates";
// import "./App.css"; // styles toolbox

function App() {
   return (
      <div className="App">
         <Router>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/FormBuilder" element={<FormBuilder />} />
               <Route path="/Publish/:formId" element={<Publish />} />
               <Route path="/FormView/:formId" element={<FormView />} />
               <Route path="/Templates" element={<Templates />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
