import React, { useState } from "react";
import "./index.scss";
import FormBuilder from "./FormBuilder";
import axios from "axios";

const Publish = () => {
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

   return (
      <>
         <header className="header-wrapper">
            <h1 className="header">This is the Publish Page.</h1>
            {/* <h5>{data}</h5> */}
         </header>
      </>
   );
};

export default Publish;
