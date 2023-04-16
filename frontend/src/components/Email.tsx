import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";

const Email = () => {
   const { emailText, setEmailText } = useContext(FormContext);
   const [textAlign, setTextAlign] = useState("left");

   const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newText = event.target.value;
      console.log(newText);
      setEmailText(newText);
   };

   const handleAlignment = (alignment: any) => {
      setTextAlign(alignment);
   };

   return (
      <>
         <div className="header-panel-container">
            <header className="header">Email</header>

            <div className="header-input">
               <input
                  type="text"
                  value={emailText}
                  onChange={handleTextChange}
                  placeholder="Enter email"
                  minLength={2}
                  maxLength={35}
               />
            </div>

            <div className="alignment-label">
               <label>Alignment</label>
            </div>

            <div className="alignment-btns">
               <button onClick={() => handleAlignment("left")}>Left</button>
               <button onClick={() => handleAlignment("center")}>Center</button>
               <button onClick={() => handleAlignment("right")}>Right</button>
            </div>

            <button className="editor-close-btn button is-info">Save & Close</button>
         </div>
      </>
   );
};

export default Email;
