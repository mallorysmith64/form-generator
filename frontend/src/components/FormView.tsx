import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface FormData {
   _id: { $oid: string };
   header: string;
   email: string;
   firstName: string;
   lastName: string;
}

function FormView() {
   const { formId } = useParams();
   const [formData, setFormData] = useState<FormData | null>(null);

   const baseURL = "http://localhost:5000/Publish";

   const viewForm = async (formId: string) => {
      try {
         const resp = await axios.get(`${baseURL}/${formId}`);
         const { form_data } = resp.data;
         console.log(form_data);
         setFormData(form_data);
      } catch (error) {
         console.error("Error fetching form data: ", error);
      }
   };

   useEffect(() => {
      viewForm(formId);
   }, [formId]);

   return (
      <>
         <section className="form-builder-page-container">
            <div className="form-builder">
               <div className="dropzone-container">
                  {formData &&
                     Object.entries(formData)
                        .filter(([key]) => key !== "_id")
                        .map(([key, value], index) => (
                           <div className="dropzone-item" key={index}>
                              <p>{value}</p>
                           </div>
                        ))}
               </div>
            </div>
         </section>

         <div className="formview-btn-container">
            <button type="submit" className="button formview-btn is-success is-large">
               Submit
            </button>
         </div>
      </>
   );
}

export default FormView;
