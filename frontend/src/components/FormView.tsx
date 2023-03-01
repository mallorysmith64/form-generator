import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactFormBuilder } from "react-form-builder2";
import { useParams } from "react-router-dom";

type FormField = {
   type: string;
   name: string;
   label?: string;
   required?: boolean;
   options?: Array<{
      value: string;
      label: string;
   }>;
   subtype?: string;
};

const formFields: FormField[] = [
   {
      type: "text",
      name: "first_name",
      label: "First Name",
      required: true,
   },
   {
      type: "text",
      name: "last_name",
      label: "Last Name",
      required: true,
   },
   {
      type: "select",
      name: "gender",
      label: "Gender",
      required: true,
      options: [
         { value: "male", label: "Male" },
         { value: "female", label: "Female" },
      ],
   },
   {
      type: "checkbox-group",
      name: "skills",
      label: "Skills",
      required: true,
      options: [
         { value: "html", label: "HTML" },
         { value: "css", label: "CSS" },
         { value: "javascript", label: "JavaScript" },
      ],
   },
];

function FormView() {
   const [formData, setFormData] = useState([]);
   // const { formId } = useParams();
   const [formId] = useState("63fe6b4dc6ca7a1a8096b8bb");

   // const baseURL = "http://localhost:5000/Publish/";

   const viewForm = async (formId: string) => {
      try {
         // const resp = await axios.get(`${baseURL}${formId}`);
         const resp = {
            data: {
               formData: [
                  {
                     type: "header",
                     subtype: "h1",
                     label: "Form",
                     content: "Form",
                  },
                  {
                     type: "label",
                     label: "Enter a label for this field",
                     content: "",
                     italic: true,
                  },
                  {
                     type: "paragraph",
                     label: "Enter paragraph text",
                     content: "",
                  },
                  {
                     type: "lineBreak",
                     content: "",
                  },
                  {
                     type: "dropdown",
                     label: "Select an option",
                     content: "Please select an option",
                     options: [
                        { text: "Option 1", value: "1" },
                        { text: "Option 2", value: "2" },
                        { text: "Option 3", value: "3" },
                     ],
                  },
                  {
                     type: "tags",
                     label: "tags",
                     content: "",
                     options: [
                        { text: "Tag 1", value: "1" },
                        { text: "Tag 2", value: "2" },
                        { text: "Tag 3", value: "3" },
                     ],
                  },
                  {
                     type: "checkboxes",
                     label: "Select options",
                     content: "",
                     options: [
                        { text: "Option 1", value: "Value 1" },
                        { text: "Option 2", value: "Value 2" },
                        { text: "Option 3", value: "Value 3" },
                     ],
                  },
                  {
                     type: "radioButtons",
                     label: "Select an option",
                     content: "",
                     options: [
                        { text: "Option 1", value: "1" },
                        { text: "Option 2", value: "2" },
                        { text: "Option 3", value: "3" },
                     ],
                  },
                  // {
                  //    type: "textInput",
                  //    label: "Enter text",
                  //    content: "",
                  // },
                  // {
                  //    type: "numberInput",
                  //    label: "Enter number",
                  //    content: "",
                  // },
                  // {
                  //    type: "textArea",
                  //    label: "Enter text here",
                  //    content: "",
                  // },
                  // {
                  //    type: "rating",
                  //    label: "Rate this item",
                  //    content: "",
                  // },
                  // {
                  //    type: "hyperLink",
                  //    label: "Enter a website",
                  //    content: "",
                  //    href: "",
                  // },
                  // {
                  //    type: "range",
                  //    label: "Slide to select a value",
                  //    content: "",
                  //    step: 1,
                  //    defaultValue: 3,
                  //    minValue: 1,
                  //    maxValue: 5,
                  //    minLabel: "Min Label",
                  //    maxLabel: "Max label",
                  // },
                  // {
                  //    type: "signature",
                  //    label: "Signature",
                  //    content: "",
                  // },
               ],
            },
         };
         console.log(resp.data);
         setFormData(resp.data.formData);
      } catch (error) {
         console.error("Error fetching form data: ", error);
      }
   };

function renderFormFields(fields: any[]) {
   return fields.map((field: any, index: number) => {
      switch (field.type) {
         case "header":
            return (
               <h1 key={index} className="view-form-header">
                  {field.content}
               </h1>
            );
         case "label":
            return (
               <div key={index} className="view-form-group">
                  <label className="view-form-label">{field.label}</label>
                  {field.italic ? (
                     <i className="view-form-label-italic">{field.content}</i>
                  ) : (
                     <span className="view-form-label">{field.content}</span>
                  )}
               </div>
            );
         case "paragraph":
            return (
               <p key={index} className="view-form-paragraph">
                  {field.content}
               </p>
            );
         case "lineBreak":
            return <hr key={index} className="view-form-linebreak" />;
         case "dropdown":
            return (
               <div key={index} className="view-form-group">
                  <label className="view-form-label">{field.label}</label>
                  <select className="view-form-dropdown" defaultValue="">
                     <option value="" disabled>
                        {field.content}
                     </option>
                     {field.options.map((option: any, index: number) => (
                        <option key={index} value={option.value}>
                           {option.text}
                        </option>
                     ))}
                  </select>
               </div>
            );
         case "tags":
            return (
               <div key={index} className="view-form-group">
                  <label className="view-form-label">{field.label}</label>
                  <div className="view-form-tags">
                     {field.options.map((option: any, index: number) => (
                        <span key={index} className="view-form-tag">
                           {option.text}
                        </span>
                     ))}
                  </div>
               </div>
            );
         case "checkboxes":
            return (
               <div key={index} className="view-form-group">
                  <label className="view-form-label">{field.label}</label>
                  <div className="view-form-checkboxes">
                     {field.options.map((option: any, index: number) => (
                        <label key={index} className="view-form-checkbox-label">
                           <input
                              type="checkbox"
                              value={option.value}
                              className="view-form-checkbox"
                           />
                           {option.text}
                        </label>
                     ))}
                  </div>
               </div>
            );
         case "radioButtons":
            return (
               <div key={index} className="view-form-group">
                  <label className="view-form-label">{field.label}</label>
                  <div className="view-form-radio-buttons">
                     {field.options.map((option: any, index: number) => (
                        <label key={index} className="view-form-radio-label">
                           <input
                              type="radio"
                              name={`radio-${index}`}
                              value={option.value}
                              className="view-form-radio"
                           />
                           {option.text}
                        </label>
                     ))}
                  </div>
               </div>
            );
            default:
               return null;
         }
      });
   }

   useEffect(() => {
      viewForm(formId);
   }, [formId]);

   return (
      <>
         <div className="view-react-form-builder">{renderFormFields(formData)}</div>
         <div className="submit-btn">
            <button type="submit" className="button is-success is-large">
               Submit
            </button>
         </div>
      </>
   );
}

export default FormView;
