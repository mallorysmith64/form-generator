import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import CreateForm from "./components/CreateForm";
import Templates from "./components/Templates";

function App() {
   return (
      <div className="App">
         <Router>
            <NavBar />
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/FormBuilder" element={<CreateForm />} />
               <Route path="/Templates" element={<Templates />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
