import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
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
            <Footer />
         </Router>
      </div>
   );
}

export default App;
