import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";

const Email = () => {
   const { emailText, setEmailText } = useContext(FormContext);
   const [alignment, setAlignment] = useState<string>("left");

   const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newText = event.target.value;
      console.log(newText);
      setEmailText(newText);
   };

   const handleAlignment = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value);
      setAlignment(event.target.value);
   };

   return (
      <>
         <div className="header-panel-container">
            <header className="header">Email</header>

            <div className="header-input">
               <input
                  type="text"
                  className="header-input"
                  value={emailText}
                  onChange={handleTextChange}
                  placeholder="Enter email"
               />
            </div>

            <div className="alignment-container">
               <label htmlFor="alignment">Alignment</label>
               <select id="alignment" value={alignment} onChange={handleAlignment}>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
               </select>
            </div>
            <button className="editor-close-btn button is-info">Save & Close</button>
         </div>
      </>
   );
};

export default Email;
