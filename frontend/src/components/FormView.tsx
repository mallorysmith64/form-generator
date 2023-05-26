import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface FormData {
   email: string;
   header: string;
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
                  {formData && (
                     <>
                        <div className="dropzone-item">
                           <p>{formData.email}</p>
                        </div>
                        <div className="dropzone-item">
                           <p>{formData.header}</p>
                        </div>
                        <div className="dropzone-item">
                           <p>{formData.firstName}</p>
                        </div>
                        <div className="dropzone-item">
                           <p>{formData.lastName}</p>
                        </div>
                     </>
                  )}
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
