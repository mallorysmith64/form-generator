import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import { useLocalStorage } from "usehooks-ts";

const Email = () => {
   const [saveEmailText, setSaveEmailText] = useLocalStorage("email", ""); //persists text in side panel after a refresh only
   const { emailText, setEmailText } = useContext(FormContext);
   const { alignEmail, setAlignEmail } = useContext(FormContext);

   const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newEmailText = event.target.value;
      const keepText = event.target.value;
      console.log(newEmailText);
      console.log(keepText);
      setEmailText(newEmailText);
      setSaveEmailText(keepText);
   };

   const handleAlignment = (align: "left" | "center" | "right") => {
      setAlignEmail(align);
   };

   useEffect(() => {
      localStorage.setItem("emailText", JSON.stringify(emailText));
   }, [emailText]);

   return (
      <>
         <div className="header-panel-container">
            <header className="header">Email</header>

            <div className="header-input">
               <input
                  type="text"
                  value={emailText && saveEmailText}
                  onChange={handleTextChange}
                  placeholder="Enter email"
                  minLength={2}
                  maxLength={35}
               />
            </div>

            <div className="alignment-label">
               <label>Label Alignment</label>
            </div>

            <div className="alignment-btns">
               <button
                  className={alignEmail === "left" ? "active" : ""}
                  onClick={() => handleAlignment("left")}
               >
                  Left
               </button>
               <button
                  className={alignEmail === "center" ? "active" : ""}
                  onClick={() => handleAlignment("center")}
               >
                  Center
               </button>
               <button
                  className={alignEmail === "right" ? "active" : ""}
                  onClick={() => handleAlignment("right")}
               >
                  Right
               </button>
            </div>
         </div>
      </>
   );
};

export default Email;

// const { emailText, setEmailText } = useContext(FormContext);
