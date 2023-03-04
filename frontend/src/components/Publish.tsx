import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { useCopyToClipboard } from "usehooks-ts";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Publish = () => {
   const [value, copy] = useCopyToClipboard();
   const [formUrl, setFormUrl] = useState<string>("");
   const { formId } = useParams();
   const navigate = useNavigate();

   const baseURL = "http://localhost:5000/Publish/";

   const getForm = async (formId: string) => {
      try {
         const resp = await axios.get(`${baseURL}${formId}`);
         console.log(resp.data);
         const formUrl = `${window.location.origin}/FormView/${String(resp.data.form_id)}`; // format url
         // const formUrl = `${baseURL}${String(resp.data.form_id)}`; // format url
         setFormUrl(formUrl);
         console.log(formUrl);
      } catch (error) {
         console.error("Unsuccessful form submission", error);
      }
   };

   const handleCopy = () => {
      copy(formUrl);
      navigate(`/FormView/${formId}`);
   };

   useEffect(() => {
      getForm(formId);
   }, [formId]);

   return (
      <>
         <NavBar />
         <section>
            <div className="card">
               <header className="card-header">
                  <p className="card-header-title">Link to Share</p>
                  <div className="row">
                     <input className="copy-link-input" value={formUrl} readOnly></input>
                     <button className="button copy-link-btn" onClick={handleCopy}>
                        <i className="fas fa-copy"></i>
                     </button>
                  </div>
                  <p>Copied value: {value ?? "Nothing is copied yet!"}</p>
               </header>
            </div>
         </section>
      </>
   );
};

export default Publish;
