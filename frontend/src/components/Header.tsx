import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";

const Header = () => {
   const { headerText, setHeaderText, setHeaderSize } = useContext(FormContext);
   const [alignment, setAlignment] = useState<string>("left");

   const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newHeaderText = event.target.value;
      console.log(newHeaderText);
      setHeaderText(newHeaderText);
   };

   const handleAlignment = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value);
      setAlignment(event.target.value);
   };

   const handleFontSize = (size: number) => {
      setHeaderSize(size);
   };

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
               />
            </div>

            <div className="size-label">
               <label>Size</label>
            </div>

            <div className="font-size-controls">
               <button onClick={() => handleFontSize(26)}>Small</button>
               <button onClick={() => handleFontSize(28)}>Default</button>
               <button onClick={() => handleFontSize(30)}>Large</button>
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

export default Header;
