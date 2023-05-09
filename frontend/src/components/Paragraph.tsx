import React, { useState } from "react";

const Paragraph = () => {
   const [headerText, setHeaderText] = useState<string>("");
   const [fontSize, setFontSize] = useState<number>(14);
   const [alignment, setAlignment] = useState<string>("left");
   const [activeCard, setActiveCard] = useState(null);

   const handleHeaderText = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setHeaderText(event.target.value);
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
            <header className="header">Paragraph</header>
         </div>
      </>
   );
};

export default Paragraph;
