import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CreateForm from "./components/CreateForm";
import Templates from "./components/Templates";

function App() {
   return (
      <div className="App">
         <Router>
            <div>
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/FormBuilder" element={<CreateForm />} />
                  <Route path="/Templates" element={<Templates />} />
               </Routes>
            </div>
         </Router>
      </div>
   );
}

export default App;
