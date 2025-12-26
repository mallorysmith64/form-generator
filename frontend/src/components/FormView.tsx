import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import FormBuilder from "./FormBuilder";

function FormView() {
   const [formData, setFormData] = useState([]);
   const { formId } = useParams();

   const baseURL = "http://localhost:5000/Publish/";

   const viewForm = async (formId: string) => {
  try {
     const resp = await axios.get(`${baseURL}${formId}`);
     console.log("Full DB Object:", resp.data);
     
     // Match the key name you used in the POST payload
     if (resp.data.schema) {
        setFormData(resp.data.schema); 
     }
  } catch (error) {
     console.error("Error fetching form data: ", error);
  }
};

   useEffect(() => {
      viewForm(formId);
   }, [formId]);

   const renderFields = () => {
      return formData.map((field) => {
         switch (field.text) {
            case "Header":
               return <h1 key={field.key} className="title">{field.placeholder}</h1>;
            case "Email":
               return (
                  <div key={field.key} className="field">
                     <label className="label">Email</label>
                     <input className="input" type="email" placeholder={field.placeholder} />
                  </div>
               );
            case "Name":
               return (
                  <div key={field.key} className="field">
                     <label className="label">Name</label>
                     <div className="control">
                        <input className="input" type="text" placeholder="First Name" />
                        <input className="input" type="text" placeholder="Last Name" />
                     </div>
                  </div>
               );
            default:
               return null;
         }
      });
   };

   return (
      <div className="container mt-5">
         <form>
            {renderFields()}
            <div className="submit-btn mt-4">
               <button type="submit" className="button is-success is-large">
                  Submit Response
               </button>
            </div>
         </form>
      </div>
   );
}

         // <div className="submit-btn">
         //    <button type="submit" className="button is-success is-large">
         //       Submit
         //    </button>
         // </div>
//       </>
//    );
// }

export default FormView;

{
   /* <div className="view-react-form-builder">{renderFormFields(formData)}</div> */
}
