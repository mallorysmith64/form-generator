import React, { useState } from "react";
// import FormBuilder from "./FormBuilder";
import { ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";

// interface FormGeneratorProps {
//    json: any;
//    items: any[];
// }

function FormGenerator() {
   // const handleUpdate = (data: any) => {
   //    console.log("onChangeCallback", data);
   // };

   // const handleSubmit = (data: any) => {
   //    console.log("onSubmitCallback", data);
   // };

   return (
      <>
         <ReactFormGenerator form_action="http://localhost:8080/Publish" form_method="POST" data={[]}/>
      </>
   );
}

export default FormGenerator;
