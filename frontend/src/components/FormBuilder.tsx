import React from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";

const items = [
   {
     key: "Header",
     name: "Header Text",
     icon: "fa fa-heading",
     static: true,
   },
   {
     key: "Label",
     name: "Label",
     icon: "fa fa-font",
     static: true,
   },
   {
     key: "Paragraph",
     name: "Paragraph",
     icon: "fa fa-paragraph",
     static: true,
   },
   {
     key: "LineBreak",
     name: "Line Break",
     icon: "fa fa-arrows-h",
   },
   {
     key: "Dropdown",
     name: "Dropdown",
     icon: "fa fa-caret-square-o-down",
   },
   {
     key: "Tags",
     name: "Tags",
     icon: "fa fa-tags",
   },
   {
     key: "Checkboxes",
     name: "Checkboxes",
     icon: "fa fa-check-square-o",
   },
   {
     key: "RadioButtons",
     name: "Multiple Choice",
     icon: "fa fa-dot-circle-o",
   },
   {
     key: "TextInput",
     name: "Text Input",
     icon: "fa fa-font",
     static: true,
   },
   {
     key: "NumberInput",
     name: "Number Input",
     icon: "fa fa-plus",
     static: true,
   },
   {
     key: "TextArea",
     name: "Multi-line Input",
     icon: "fa fa-text-height",
     static: true,
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
     icon: "fa fa-sliders",
   },
   {
     key: "Email",
     name: "Email",
     icon: "fa fa-at",
   },
   {
     key: "Date",
     name: "Date",
     icon: "fa fa-calendar",
   },
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
