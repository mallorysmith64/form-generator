import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import { useParams } from "react-router-dom";

function FormView() {
   const [formUrl, setFormUrl] = useState<string>("");
   const { formId } = useParams();

   const baseURL = "http://localhost:5000/Publish/";

   const viewForm = async (formId: string) => {
      try {
         const resp = await axios.get(`${baseURL}${formId}`);
         console.log(resp.data);
         setFormUrl(formUrl);
      } catch (error) {
         console.error("Unsuccessful form submission", error);
      }
   };

   useEffect(() => {
      viewForm(formId);
   }, [formId]);

   return (
      <>
         <div>
            <ReactFormBuilder toolbarItems={[]} />
         </div>
      </>
   );
}

export default FormView;
