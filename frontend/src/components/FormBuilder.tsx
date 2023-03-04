import axios from "axios";
import React, { FormEventHandler, useEffect, useState } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import { useNavigate } from "react-router-dom";
import "react-form-builder2/dist/app.css";
import NavBar from "./NavBar";

interface FormBuilderProps {
   toolbarItems: {
      key: string;
      name: string;
      icon: string;
      static: boolean;
      content: string;
   }[];
   url: string;
   e: (data: any) => void;
}

const items = [
   {
      key: "Header",
      name: "Header Text",
      icon: "fa fa-heading",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Label",
      name: "Label",
      icon: "fa fa-font",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Paragraph",
      name: "Paragraph",
      icon: "fa fa-paragraph",
      static: true,
      content: "Placeholder",
   },
   {
      key: "LineBreak",
      name: "Line Break",
      icon: "fa fa-arrows-alt-h",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Dropdown",
      name: "Dropdown",
      icon: "far fa-caret-square-down",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Tags",
      name: "Tags",
      icon: "fas fa-tags",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Checkboxes",
      name: "Checkboxes",
      icon: "far fa-check-square",
      static: true,
      content: "Placeholder",
   },
   {
      key: "RadioButtons",
      name: "Multiple Choice",
      icon: "far fa-dot-circle",
      static: true,
      content: "Placeholder",
   },
   {
      key: "TextInput",
      name: "Text Input",
      icon: "fa fa-font",
      static: true,
      content: "Placeholder",
   },
   {
      key: "NumberInput",
      name: "Number Input",
      icon: "fa fa-plus",
      static: true,
      content: "Placeholder",
   },
   {
      key: "TextArea",
      name: "Multi-line Input",
      icon: "fa fa-text-height",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Rating",
      name: "Rating",
      icon: "fa fa-star",
      static: true,
      content: "Placeholder",
   },
   {
      key: "HyperLink",
      name: "Web site",
      icon: "fa fa-link",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Range",
      name: "Range",
      icon: "fas fa-sliders-h",
      static: true,
      content: "Placeholder",
   },
   {
      key: "Signature",
      name: "Signature",
      icon: "fa fa-edit",
      static: true,
      content: "Placeholder",
   },
];

function FormBuilder() {
   const [data, setData] = useState({});
   const navigate = useNavigate();

   const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
         const resp = await axios.post("http://localhost:5000/Publish", data);
         console.log("Form submitted successfully", resp);
         const formId = resp.data.form_id;
         console.log(`Form submitted with ID: ${formId}`);
         navigate(`/Publish/${formId}`); // Navigate to the Publish component with the formId as a URL parameter
      } catch (error) {
         console.error("Unsuccessful form submission", error);
         alert("Form submission was unsuccessful. Please try again.");
      }
   };

   const updateForm: FormEventHandler<HTMLFormElement> = (e) => {
      const target = e.target as HTMLInputElement;
      console.log(target);
      setData({ ...data, [target.id]: target.value });
   };

   return (
      <>
         <NavBar />
         <form className="form" onSubmit={handleSubmit} onChange={updateForm}>
            <ReactFormBuilder
               url="http://localhost:5000/NewForm"
               toolbarItems={items}
               saveUrl="http://localhost:5000/Publish"
            />
            <div className="publish-btn">
               <button type="submit" className="button is-link is-large">
                  Publish
               </button>
            </div>
         </form>
      </>
   );
}
export default FormBuilder;

{
   /* <ReactFormGenerator
            data={[]}
            form_action="/data"
            form_method="POST"
            action_name="Publish"
         /> */
}

// localStorage.setItem("formData", JSON.stringify(resp.data));
