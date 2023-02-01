import React from "react";
import "./index.scss";
import FormBuilder from "./FormBuilder";

const Publish = (
   props: {
      data:
         | string
         | number
         | boolean
         | React.ReactElement<any, string | React.JSXElementConstructor<any>>
         | React.ReactFragment
         | React.ReactPortal
         | null
         | undefined;
      formData:
         | string
         | number
         | boolean
         | React.ReactElement<any, string | React.JSXElementConstructor<any>>
         | React.ReactFragment
         | React.ReactPortal
         | null
         | undefined;
   },
) => {
   return (
      <>
         <header className="header-wrapper">
            <h1 className="header">This is the Publish Page.</h1>
         </header>
         <h5>Form data: {props.data}</h5>
         <h5>Data: {props.formData} </h5>
      </>
   );
};

export default Publish;
