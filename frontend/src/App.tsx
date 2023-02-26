import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import FormBuilder from "./components/FormBuilder";
import Publish from "./components/Publish";
import Templates from "./components/Templates";
// import "./App.css"; // styles toolbox

function App() {
   return (
      <div className="App">
         <Router>
            <NavBar />

            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/FormBuilder" element={<FormBuilder />} />
               <Route path="/Publish/:formId" element={<Publish />} />
               <Route path="/Templates" element={<Templates />} />
            </Routes>
            <Footer />
         </Router>
      </div>
   );
}

export default App;
