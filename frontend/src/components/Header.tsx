import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";
import { useLocalStorage } from "usehooks-ts";

const Header = () => {
   const [headerText, setHeaderText] = useLocalStorage("header", "")
   const {setHeaderSize} = useContext(FormContext)
   const { alignHeader, setAlignHeader } = useContext(FormContext);
   // const { onSave } = useContext(FormContext);

   const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newHeaderText = event.target.value;
      console.log(newHeaderText);
      setHeaderText(newHeaderText);
   };

   const handleAlignment = (align: "left" | "center" | "right") => {
      setAlignHeader(align);
   };

   const handleFontSize = (size: number) => {
      setHeaderSize(size);
   };

   // const handleSave = () => {
   //    onSave({ headerText, headerSize, alignHeader }); // call onSave function from FormContext with current values of headerText, headerSize, and alignHeader
   //  };

   return (
      <>
         <div className="header-panel-container">
            <header className="header">Header</header>

            <div className="header-input">
               <input
                  type="text"
                  className="header-input"
                  value={headerText}
                  onChange={handleTextChange}
                  placeholder="Enter header"
                  minLength={2}
                  maxLength={30}
               />
            </div>

            <div className="size-label">
               <label>Size</label>
            </div>

            <div className="font-size-btns">
               <button onClick={() => handleFontSize(24)}>Small</button>
               <button onClick={() => handleFontSize(28)}>Default</button>
               <button onClick={() => handleFontSize(32)}>Large</button>
               <button onClick={() => handleFontSize(36)}>Extra</button>
            </div>

            <div className="alignment-label">
               <label>Alignment</label>
            </div>

            <div className="alignment-btns">
               <button
                  className={alignHeader === "left" ? "active" : ""}
                  onClick={() => handleAlignment("left")}
               >
                  Left
               </button>
               <button
                  className={alignHeader === "center" ? "active" : ""}
                  onClick={() => handleAlignment("center")}
               >
                  Center
               </button>
               <button
                  className={alignHeader === "right" ? "active" : ""}
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

export default Header;

   // const { headerText, setHeaderText, setHeaderSize } = useContext(FormContext);