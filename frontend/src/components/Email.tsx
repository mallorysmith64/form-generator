import React, { useState } from "react";

const Email = () => {
   const [text, setText] = useState<string>("");
   const [alignment, setAlignment] = useState<string>("left");

   const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setText(event.target.value);
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
                  value={text}
                  onChange={handleText}
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
         </div>
      </>
   );
};

export default Email;
