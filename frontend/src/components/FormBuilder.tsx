import React from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";

const items = [
   {
     key: "Header",
     name: "Header Text",
     icon: "fa fa-heading"
   },
   {
     key: "Label",
     name: "Label",
     icon: "fa fa-font",
   },
   {
     key: "Paragraph",
     name: "Paragraph",
     icon: "fa fa-paragraph",
   },
   {
     key: "LineBreak",
     name: "Line Break",
     icon: "fa fa-arrows-alt-h"
   },
   {
     key: "Dropdown",
     name: "Dropdown",
     icon: "far fa-caret-square-down",
   },
   {
     key: "Tags",
     name: "Tags",
     icon: "fas fa-tags",
   },
   {
     key: "Checkboxes",
     name: "Checkboxes",
     icon: "far fa-check-square",
   },
   {
     key: "RadioButtons",
     name: "Multiple Choice",
     icon: "far fa-dot-circle",
   },
   {
     key: "TextInput",
     name: "Text Input",
     icon: "fa fa-font",
   },
   {
     key: "NumberInput",
     name: "Number Input",
     icon: "fa fa-plus",
   },
   {
     key: "TextArea",
     name: "Multi-line Input",
     icon: "fa fa-text-height",
   },
   {
     key: "Image",
   },
   {
     key: "Rating",
     name: "Rating",
     icon: "fa fa-star",
   },
   {
     key: "HyperLink",
     name: "Web site",
     icon: "fa fa-link",
   },
   {
     key: "Range",
     name: "Range",
     icon: "fas fa-sliders-h",
   },
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
   {
     key: "Signature",
     name: "Signature",
     icon: "fa fa-edit",
   },
 ];


function FormBuilder() {
   const onSubmitCallback = (data: any) => {
      console.log("onSubmitCallback", data);
   };

   return (
      <>
         {/* @ts-ignore */}
         <ReactFormBuilder toolbarItems={items} onSubmit={onSubmitCallback} />
      </>
   );
}

export default FormBuilder;
