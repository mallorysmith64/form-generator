import React, { useEffect, useState } from "react";
import "./index.scss";
import FormBuilder from "./FormBuilder";
import axios from "axios";
import { useCopyToClipboard } from "usehooks-ts";
// import { useParams } from "react-router-dom";

const baseURL = "http://form.formgenerator.com";

const Publish = (props: any) => {
   const [value, copy] = useCopyToClipboard();

   // const [data, setData] = useState({});
   // const { id } = useParams();
   const [url, setUrl] = useState(`${baseURL}/id`);
   console.log(url);

   // const getForm = async (id: any) => {
   //    const resp = await axios.get(`http://localhost:5000/Publish${data}`);
   //    console.log("form id: ", resp.data);
   //    setData(resp.data);
   //    console.log("set the data", resp.data);
   // };

   // useEffect(() => {
   //    getForm(data);
   // }, [data]);

   return (
      <>
         <div className="card">
            <header className="card-header">
               <p className="card-header-title">Link to Share</p>
               <div className="row">
                  <input className="copy-link-input" value={url}></input>
                  <button className="button copy-link-btn" onClick={() => copy(url)}>
                     <i className="fas fa-copy"></i>
                  </button>
                  <p>Copied value: {value ?? "Nothing is copied yet!"}</p>
               </div>
            </header>
         </div>
      </>
   );
};

export default Publish;

// const [data, setData] = useState({});
// const [id] = useState(props.match.params.id);

// const getForm = async (id: any) => {
//    const resp = await axios.get(`http://localhost:5000/Publish${id}`);
//    console.log("form id", resp.data);
//    setData(resp.data);
// };

// useEffect(() => {
//    getForm(id);
// }, [id]);

// if (!data) return "null";
