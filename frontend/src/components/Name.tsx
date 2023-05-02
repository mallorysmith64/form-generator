import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";

const Name = () => {
   const { firstNameText, setFirstNameText, lastNameText, setLastNameText, setNameSize } = useContext(FormContext);
   const { alignName, setAlignName } = useContext(FormContext);

   const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFirstNameText = event.target.value;
      console.log(newFirstNameText);
      setFirstNameText(newFirstNameText);
   };

   const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLastNameText = event.target.value;
      console.log(newLastNameText);
      setLastNameText(newLastNameText);
   };

   const handleFontSize = (size: number) => {
      setNameSize(size);
   };

   const handleAlignment = (align: "left" | "center" | "right") => {
      setAlignName(align);
   };

   return (
      <>
         <div className="header-panel-container">
            <header className="header">Name</header>

            <div className="header-input">
               <input
                  type="text"
                  className="header-input"
                  value={firstNameText}
                  onChange={handleFirstNameChange}
                  placeholder="Enter First Name"
                  minLength={2}
                  maxLength={25}
               />
            </div>
            <div>
               <input
                  type="text"
                  className="header-input"
                  value={lastNameText}
                  onChange={handleLastNameChange}
                  placeholder="Enter Last Name"
                  minLength={2}
                  maxLength={25}
               />
            </div>

            <div className="size-label">
               <label>Size</label>
            </div>

            <div className="font-size-btns">
               <button onClick={() => handleFontSize(22)}>Small</button>
               <button onClick={() => handleFontSize(24)}>Default</button>
               <button onClick={() => handleFontSize(26)}>Large</button>
            </div>

            <div className="alignment-label">
               <label>Alignment</label>
            </div>

            <div className="alignment-btns">
               <button
                  className={alignName === "left" ? "active" : ""}
                  onClick={() => handleAlignment("left")}
               >
                  Left
               </button>
               <button
                  className={alignName === "center" ? "active" : ""}
                  onClick={() => handleAlignment("center")}
               >
                  Center
               </button>
               <button
                  className={alignName === "right" ? "active" : ""}
                  onClick={() => handleAlignment("right")}
               >
                  Right
               </button>
            </div>


            <div>
               <button className="editor-close-btn button is-info">Save & Close</button>
            </div>
         </div>
      </>
   );
};

export default Name;
