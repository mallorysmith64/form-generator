import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //useHistory was replaced by useNavigate
import { ReactFormBuilder, ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";

interface FormBuilderProps {
   toolbarItems: {
      key: string;
      name: string;
      icon: string;
      static: boolean;
      content: string;
   }[];
   onSave: (data: any) => void;
   url: string;
   e: (data: any) => void;
   data: (data: any) => void;
   actionName: string;
}

function FormBuilder() {
   const [formData, setFormData] = useState([]);
   console.log(formData)
   const navigate = useNavigate();
   // const [submitted, setSubmitted] = useState(false);

   const submitForm = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
         e.preventDefault();
         const resp = await axios.post(`http://localhost:8080/Publish`, formData);
         localStorage.setItem("formData", JSON.stringify(resp.data));
         console.log(resp.data);
         setFormData(resp.data);
         navigate("/Publish");
      } catch (error) {
         console.error(`${error}`);
      }
   };

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

   return (
      <>
         <form onSubmit={submitForm}>
            <ReactFormBuilder
               toolbarItems={items}
               url="http://localhost:8080/FormBuilder"
               saveUrl="http://localhost:8080/Publish"
            />

            <ReactFormGenerator
               form_action="http://localhost:8080/Publish"
               form_method="POST"
               data={[]}
               action_name="Publish"
            />
         </form>
      </>
   );
}

export default FormBuilder;

// const handleSave = (e: { target: { value: React.SetStateAction<never[]>; }; }) => {
//    setFormData(e.target.value);
//  };

// const handleChange = (e: { target: { id: any; value: any; }; }) => {
//    setFormData({
//      ...formData,
//      [e.target.id]: e.target.value,
//    });
//  };

//  edit data={form}
//  onChange={handleUpdate}
//  onSubmit={handleSubmit}
//  renderEditForm={props => <FormElementsEdit {...props}/>}
//  {
//    key: "Email",
//    name: "Email",
//    icon: "fas fa-envelope",
//  },
//  {
//    key: "Date",
//    name: "Date",
//    icon: "far fa-calendar-alt",
//  },
// {
//   key: "Image",
//   name:"Image",
//   static:true,
//   content:"Placeholder"
// },
