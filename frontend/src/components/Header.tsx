import React, { useState } from "react";

interface HeaderProps {
   showEditor: boolean;
   activeCard: string;
}

const Header = () => {
   const [text, setText] = useState<string>("");
   const [fontSize, setFontSize] = useState<number>(14);
   const [alignment, setAlignment] = useState<string>("left");
   const [activeCard, setActiveCard] = useState(null);

   const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setText(event.target.value);
   };

   const handleFontSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(parseInt(event.target.value));
      setFontSize(parseInt(event.target.value));
   };

   const handleAlignment = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value);
      setAlignment(event.target.value);
   };

   const handleDecreaseFontSize = () => {
      if (fontSize > 10) {
         setFontSize(fontSize - 2);
      }
   };

   const handleIncreaseFontSize = () => {
      if (fontSize < 20) {
         setFontSize(fontSize + 2);
      }
   };

   return (
      <>
         <div className="header-panel-container">
            <header className="header">Header</header>

            <div className="header-input">
               <input
                  type="text"
                  className="header-input"
                  value={text}
                  onChange={handleText}
                  placeholder="Enter header"
               />
            </div>

            <div className="size-label">
               <label>Size</label>
            </div>

            <div className="font-size-controls">
               <button onClick={handleDecreaseFontSize}>-</button>
               <select id="fontSize" value={fontSize} onChange={handleFontSize}>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
               </select>
               <button onClick={handleIncreaseFontSize}>+</button>
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

export default Header;
