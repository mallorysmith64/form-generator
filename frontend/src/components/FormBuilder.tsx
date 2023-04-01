import React, { useState } from "react";
import DragDrop from "./DragDrop";
import NavBar from "./NavBar";

function FormBuilder() {
   return (
      <>
         <NavBar />

         <DragDrop />
      </>
   );
}

export default FormBuilder;
