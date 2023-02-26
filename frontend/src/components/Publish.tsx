import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { useCopyToClipboard } from "usehooks-ts";
import { useParams } from "react-router-dom";

const Publish = () => {
   const [value, copy] = useCopyToClipboard();
   const [formUrl, setFormUrl] = useState<string>("");
   const { formId } = useParams();
   console.log("b0", formId);

   const baseURL = "http://localhost:5000/Publish/";

   const getForm = async (formId: string) => {
      try {
         const resp = await axios.get(`${baseURL}${formId}`);
         console.log(resp.data);
         const formUrl = `${baseURL}${String(resp.data.form_id)}`; // format url
         setFormUrl(formUrl);
         console.log(formUrl);
      } catch (error) {
         console.error("Unsuccessful form submission", error);
      }
   };

   useEffect(() => {
      getForm(formId);
   }, [formId]);

   return (
      <>
         <div className="card">
            <header className="card-header">
               <p className="card-header-title">Link to Share</p>
               <div className="row">
                  <input className="copy-link-input" value={formUrl}></input>
                  <button className="button copy-link-btn" onClick={() => copy(formUrl)}>
                     <i className="fas fa-copy"></i>
                  </button>
               </div>
               <p>Copied value: {value ?? "Nothing is copied yet!"}</p>
            </header>
         </div>
      </>
   );
};

export default Publish;

// if (!data) return "null";
