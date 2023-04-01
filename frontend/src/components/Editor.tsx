import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
   const [value, setValue] = useState("");

   return (
      <>
         <div id="editor-container">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
         </div>
      </>
   );
};

export default Editor;
