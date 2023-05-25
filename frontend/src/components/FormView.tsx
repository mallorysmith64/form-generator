import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FormView() {
   const [formData, setFormData] = useState([]);
   const { formId } = useParams();

   const baseURL = "http://localhost:5000/Publish/";

   const viewForm = async (formId: string) => {
      try {
         const resp = await axios.get(`${baseURL}${formId}`);
         setFormData(resp.data.formData);
      } catch (error) {
         console.error("Error fetching form data: ", error);
      }
   };

   useEffect(() => {
      viewForm(formId);
   }, [formId]);

   return (
      <>
         <div className="submit-btn">
            <button type="submit" className="button is-success is-large">
               Submit
            </button>
         </div>
      </>
   );
}

export default FormView;
