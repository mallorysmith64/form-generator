import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./components/HomePage";
import FormBuilder from "./components/FormBuilder";
import Publish from "./components/Publish";
import FormView from "./components/FormView";
import Templates from "./components/Templates";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormContext } from "./components/FormContext";

function App() {
   const [headerText, setHeaderText] = useState("Type Header");
   const [emailText, setEmailText] = useState("Type Email");

   return (
      <>
         <FormContext.Provider
            value={{
               headerText,
               setHeaderText,
               emailText,
               setEmailText
            }}
         >
         <DndProvider backend={HTML5Backend}>
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
         </DndProvider>
         </FormContext.Provider>
      </>
   );
}

export default App;
